/**
 * Downloads the DoppioJVM browser runtime + Java 8 class library into
 * public/doppio/ so Java demos can run client-side.
 *
 * The class library is ~97MB extracted, so it is gitignored and fetched at
 * install/build time instead of being committed.
 *
 * Layout produced:
 *   public/doppio/doppio.js            <- DoppioJVM release bundle
 *   public/doppio/browserfs.min.js     <- BrowserFS (Doppio's filesystem layer)
 *   public/doppio/vendor/java_home/**  <- JDK 8 class library (rt.jar etc.)
 *   public/doppio/listings.json        <- BrowserFS XmlHttpRequest FS index
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const os = require("os");
const { execFileSync } = require("child_process");

const DOPPIO_VERSION = "0.5.0";
const BROWSERFS_VERSION = "1.4.3";
const JCL_URL =
  "https://github.com/plasma-umass/doppio_jcl/releases/download/v3.2/java_home.tar.gz";

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public", "doppio");
const VENDOR = path.join(OUT, "vendor");

function log(msg) {
  console.log(`[doppio] ${msg}`);
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const get = (u, redirects = 0) => {
      if (redirects > 5) return reject(new Error("Too many redirects"));
      https
        .get(u, { headers: { "User-Agent": "node" } }, (res) => {
          if (
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            res.resume();
            return get(res.headers.location, redirects + 1);
          }
          if (res.statusCode !== 200) {
            res.resume();
            return reject(new Error(`GET ${u} -> ${res.statusCode}`));
          }
          const file = fs.createWriteStream(dest);
          res.pipe(file);
          file.on("finish", () => file.close(resolve));
          file.on("error", reject);
        })
        .on("error", reject);
    };
    get(url);
  });
}

/** Pull a single npm package into a temp dir and return its path. */
function npmExtract(pkg, version, tmp) {
  const dir = path.join(tmp, pkg);
  fs.mkdirSync(dir, { recursive: true });
  execFileSync("npm", ["pack", `${pkg}@${version}`, "--silent"], {
    cwd: tmp,
    stdio: ["ignore", "pipe", "pipe"],
  });
  const tgz = fs
    .readdirSync(tmp)
    .find((f) => f.startsWith(pkg) && f.endsWith(".tgz"));
  if (!tgz) throw new Error(`npm pack produced no tarball for ${pkg}`);
  execFileSync("tar", [
    "xzf",
    path.join(tmp, tgz),
    "-C",
    dir,
    "--strip-components=1",
  ]);
  return dir;
}

/**
 * Build the nested index BrowserFS's XmlHttpRequest filesystem expects:
 * directories map to objects, files map to null.
 */
function buildListing(dir) {
  const out = {};
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    out[entry.name] = entry.isDirectory()
      ? buildListing(path.join(dir, entry.name))
      : null;
  }
  return out;
}

async function main() {
  if (fs.existsSync(path.join(VENDOR, "java_home", "lib", "rt.jar"))) {
    log("already installed, skipping");
    return;
  }

  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "doppio-setup-"));

  try {
    log(`fetching doppiojvm@${DOPPIO_VERSION} and browserfs@${BROWSERFS_VERSION}...`);
    const doppioDir = npmExtract("doppiojvm", DOPPIO_VERSION, tmp);
    const bfsDir = npmExtract("browserfs", BROWSERFS_VERSION, tmp);

    fs.copyFileSync(
      path.join(doppioDir, "dist", "release", "doppio.js"),
      path.join(OUT, "doppio.js")
    );
    fs.copyFileSync(
      path.join(bfsDir, "dist", "browserfs.min.js"),
      path.join(OUT, "browserfs.min.js")
    );

    log("downloading Java 8 class library (~38MB)...");
    const tgz = path.join(tmp, "java_home.tar.gz");
    await download(JCL_URL, tgz);

    log("extracting class library (~97MB)...");
    fs.mkdirSync(VENDOR, { recursive: true });
    execFileSync("tar", ["xzf", tgz, "-C", VENDOR]);

    // Doppio expects its own jar alongside the JDK's.
    const doppioJar = path.join(doppioDir, "dist", "doppio.jar");
    if (fs.existsSync(doppioJar)) {
      fs.copyFileSync(
        doppioJar,
        path.join(VENDOR, "java_home", "lib", "doppio.jar")
      );
    }

    log("generating listings.json...");
    fs.writeFileSync(
      path.join(OUT, "listings.json"),
      JSON.stringify({ vendor: buildListing(VENDOR) })
    );

    log("done -> public/doppio/");
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

main().catch((e) => {
  console.error(`[doppio] setup failed: ${e.message}`);
  process.exit(1);
});
