"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import WindowFrame from "@/components/WindowFrame";
import "xterm/css/xterm.css";

const TERM_THEME = {
  background: "#0d1117",
  foreground: "#e6edf3",
  cursor: "#58a6ff",
  cursorAccent: "#0d1117",
  red: "#ff7b72",
  green: "#3fb950",
  yellow: "#d29922",
  blue: "#58a6ff",
  brightBlack: "#6e7681",
  brightWhite: "#f0f6fc",
};

// Runtimes must only be initialized once per page.
let bfsReady = null;
let pyodideReady = null;

/**
 * DoppioJVM calls Node's setImmediate to yield between bytecode batches, but
 * it is not a browser API and the bundle ships no shim for it -- without this
 * the JVM dies with "setImmediate is not defined" before producing output.
 *
 * MessageChannel is used rather than setTimeout(fn, 0) because nested timeouts
 * are clamped to ~4ms, which would throttle the interpreter to a crawl.
 */
function installSetImmediate() {
  if (typeof window === "undefined" || window.setImmediate) return;
  const tasks = new Map();
  let nextId = 1;
  const { port1, port2 } = new MessageChannel();
  port1.onmessage = (e) => {
    const task = tasks.get(e.data);
    if (!task) return;
    tasks.delete(e.data);
    task.fn(...task.args);
  };
  window.setImmediate = (fn, ...args) => {
    const id = nextId++;
    tasks.set(id, { fn, args });
    port2.postMessage(id);
    return id;
  };
  window.clearImmediate = (id) => tasks.delete(id);
}

/**
 * config: { type: "java" | "python", entry: "/binaries/x.jar" | "/scripts/x.py" }
 *
 * Java runs on DoppioJVM, which emulates blocking I/O and so supports real
 * interactive stdin -- you type into the terminal and the JVM reads it.
 * Python runs on Pyodide, which cannot block, so stdin is pre-filled instead.
 */
export default function TerminalEmulator({ config }) {
  const termRef = useRef(null);
  const termInstance = useRef(null);
  const stdinWriter = useRef(null); // set while a Java program is running
  const lineBuffer = useRef("");

  const [stdinInput, setStdinInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | running | done
  const [ready, setReady] = useState(false);
  const [bfsLoaded, setBfsLoaded] = useState(false);

  const isJava = config.type === "java";

  useEffect(() => {
    if (!termRef.current || termInstance.current) return;
    // No fixed cols/rows: a hardcoded size overflows the container, and the
    // clipped viewport takes its scrollbar with it. FitAddon derives the grid
    // from the container instead so xterm's own scrolling works.
    const term = new Terminal({
      theme: TERM_THEME,
      cursorBlink: isJava,
      convertEol: true,
      scrollback: 5000,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: 13,
    });
    const fit = new FitAddon();
    term.loadAddon(fit);
    // Open on the next frame rather than synchronously. Under React StrictMode
    // the effect runs, cleans up, then runs again; opening synchronously would
    // leave the discarded instance's queued Viewport refresh to fire after
    // dispose, which throws ("cannot read properties of undefined (reading
    // 'dimensions')"). Deferring means the discarded instance is never opened.
    let opened = false;
    let raf = 0;
    let attempts = 0;
    let observer = null;
    const tryOpen = () => {
      const el = termRef.current;
      // Retry while the container has no layout yet; xterm needs a non-zero
      // width to compute its dimensions.
      if (!el || !el.isConnected || !el.clientWidth) {
        if (++attempts < 60) raf = requestAnimationFrame(tryOpen);
        return;
      }
      term.open(el);
      opened = true;
      fit.fit();
      // Refit when the container changes (window resize, layout shifts).
      observer = new ResizeObserver(() => {
        // Skip while collapsed/hidden: fitting to a zero-size box yields a
        // bogus grid that persists after the panel is restored.
        const node = termRef.current;
        if (!node || !node.clientWidth || !node.clientHeight) return;
        try {
          fit.fit();
        } catch {
          /* container can be mid-teardown */
        }
      });
      observer.observe(el);
      term.writeln("\x1b[90mReady. Press Run to start.\x1b[0m");
    };
    raf = requestAnimationFrame(tryOpen);

    termInstance.current = term;

    // Line-oriented input: echo locally, hand a full line to the JVM on Enter.
    const sub = term.onData((data) => {
      const write = stdinWriter.current;
      if (!write) return;
      for (const ch of data) {
        if (ch === "\r") {
          term.write("\r\n");
          write(lineBuffer.current + "\n");
          lineBuffer.current = "";
        } else if (ch === "\x7f") {
          if (lineBuffer.current) {
            lineBuffer.current = lineBuffer.current.slice(0, -1);
            term.write("\b \b");
          }
        } else if (ch >= " ") {
          lineBuffer.current += ch;
          term.write(ch);
        }
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      sub.dispose();
      // Disposing an opened terminal can still race its own pending refresh.
      if (opened) {
        try {
          term.dispose();
        } catch {
          /* xterm teardown races are not actionable here */
        }
      } else {
        term.dispose();
      }
      termInstance.current = null;
    };
  }, [isJava]);

  /** Mount Doppio's filesystem once: /sys (JCL over HTTP), /tmp + /home (memory). */
  const initBrowserFS = () =>
    (bfsReady ??= new Promise((resolve, reject) => {
      const { BrowserFS } = window;
      const mfs = new BrowserFS.FileSystem.MountableFileSystem();
      BrowserFS.initialize(mfs);
      mfs.mount("/tmp", new BrowserFS.FileSystem.InMemory());
      mfs.mount("/home", new BrowserFS.FileSystem.InMemory());
      BrowserFS.FileSystem.XmlHttpRequest.Create(
        { index: "/doppio/listings.json", baseUrl: "/doppio/" },
        (err, xhrfs) => {
          if (err) return reject(err);
          mfs.mount("/sys", xhrfs);
          resolve(BrowserFS);
        }
      );
    }));

  const runJava = async (term) => {
    installSetImmediate();
    const BrowserFS = await initBrowserFS();
    const fs = BrowserFS.BFSRequire("fs");
    const { Buffer } = BrowserFS.BFSRequire("buffer");
    const proc = BrowserFS.BFSRequire("process");

    // Copy the jar into the in-memory filesystem so the JVM can read it.
    const resp = await fetch(config.entry);
    if (!resp.ok) throw new Error(`Failed to fetch jar (${resp.status})`);
    const jarPath = "/tmp/app.jar";
    fs.writeFileSync(jarPath, Buffer.from(await resp.arrayBuffer()));

    proc.initializeTTYs();
    const pipe = (stream, color) =>
      stream.on("data", (d) => {
        const text = d.toString();
        term.write(color ? `\x1b[${color}m${text}\x1b[0m` : text);
      });
    pipe(proc.stdout, null);
    pipe(proc.stderr, "33");

    term.writeln(`\x1b[90m$ java -jar ${config.entry}\x1b[0m`);
    stdinWriter.current = (line) => proc.stdin.write(line);
    setStatus("running");

    const exit = await new Promise((resolve) =>
      window.Doppio.VM.CLI(["-jar", jarPath], { doppioHomePath: "/sys" }, resolve)
    );
    stdinWriter.current = null;
    term.writeln(`\r\n\x1b[90m[exit code ${exit ?? 0}]\x1b[0m`);
  };

  const runPython = async (term) => {
    if (!pyodideReady) {
      term.writeln("\x1b[36mInitializing Python runtime...\x1b[0m");
      pyodideReady = loadPyodide();
    }
    const pyodide = await pyodideReady;
    setStatus("running");

    term.writeln(`\x1b[90m$ python3 ${config.entry}\x1b[0m`);

    // Pyodide's `stdin` handler returns one line per call, or null for EOF.
    // (Its `read` handler is a different contract: fill a Uint8Array, return a count.)
    const lines = stdinInput.length ? stdinInput.split("\n") : [];
    let i = 0;
    pyodide.setStdin({ stdin: () => (i < lines.length ? lines[i++] : null) });
    pyodide.setStdout({ batched: (t) => term.writeln(t) });
    pyodide.setStderr({ batched: (t) => term.writeln(`\x1b[31m${t}\x1b[0m`) });

    const resp = await fetch(config.entry);
    if (!resp.ok) throw new Error(`Failed to fetch script (${resp.status})`);
    await pyodide.runPythonAsync(await resp.text());
    term.writeln("\x1b[90m[Process finished]\x1b[0m");
  };

  const run = async () => {
    const term = termInstance.current;
    if (!term || status === "running" || status === "loading") return;

    term.clear();
    lineBuffer.current = "";
    setStatus("loading");
    try {
      if (isJava) await runJava(term);
      else await runPython(term);
    } catch (e) {
      term.writeln(`\r\n\x1b[31mError: ${e?.message ?? e}\x1b[0m`);
    } finally {
      stdinWriter.current = null;
      setStatus("done");
    }
  };

  const busy = status === "running" || status === "loading";

  return (
    <WindowFrame
      title={`${isJava ? "Java" : "Python"} Terminal`}
      hint={isJava && status === "running" ? "type into the terminal" : undefined}
    >
      {({ maximized }) => (
        <div className="flex min-h-0 flex-1 flex-col text-left">
      {!isJava && (
        <div>
          <label className="text-xs text-gray-400 block mb-1 font-mono">
            stdin (one value per line)
          </label>
          <textarea
            className="w-full bg-[#161b22] border border-gray-700 text-sm text-gray-300 rounded-t px-3 py-2 font-mono resize-none focus:outline-none focus:border-blue-500"
            rows={3}
            placeholder="Peterson&#10;25"
            value={stdinInput}
            onChange={(e) => setStdinInput(e.target.value)}
          />
        </div>
      )}

      <div
        className={`flex items-center justify-between bg-[#161b22] border border-gray-700 px-2 py-1.5 ${
          isJava ? "rounded-t" : "border-t-0"
        }`}
      >
        <span className="text-xs text-gray-600 font-mono pl-1">
          {isJava && !ready ? "fetching JVM runtime..." : ""}
        </span>
        <button
          onClick={run}
          disabled={busy || !ready}
          className="px-4 py-1 text-xs rounded bg-green-700 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-mono"
        >
          {!ready
            ? "Loading..."
            : status === "loading"
            ? "Starting..."
            : status === "running"
            ? "▶ Running..."
            : "▶ Run"}
        </button>
      </div>

      {isJava ? (
        <>
          {/* doppio.js is a UMD bundle that captures the BrowserFS global at
              load time, so it must not load until BrowserFS is present. */}
          <Script
            src="/doppio/browserfs.min.js"
            strategy="afterInteractive"
            onReady={() => setBfsLoaded(true)}
          />
          {bfsLoaded && (
            <Script
              src="/doppio/doppio.js"
              strategy="afterInteractive"
              onReady={() => setReady(true)}
            />
          )}
        </>
      ) : (
        <Script
          src="https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js"
          strategy="afterInteractive"
          onReady={() => setReady(true)}
        />
      )}

      <div
        ref={termRef}
        className={`rounded-b overflow-hidden border border-t-0 border-gray-800 ${
          maximized ? "min-h-0 flex-1" : ""
        }`}
        style={maximized ? undefined : { height: "320px" }}
      />
        </div>
      )}
    </WindowFrame>
  );
}
