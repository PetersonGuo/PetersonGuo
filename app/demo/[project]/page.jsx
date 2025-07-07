"use client";
import Nav from "@/components/Nav";
import ProjectData from "@/components/ProjectData";
import { FaGithub } from "react-icons/fa";
import { TbExternalLink } from "react-icons/tb";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState, useRef } from "react";
import { useParams } from 'next/navigation';

import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

export default function Page() {
  const { project: projectId } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const termRef = useRef(null);
  const terminalInstance = useRef(null);

  useEffect(() => {
    if (!projectId) return;
    try {
      const found = ProjectData.find((p) => p.id === projectId);
      setProject(found || null);
    } catch (e) {
      console.error(e);
      setError("Failed to load project data.");
    }
  }, [projectId]);

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!project) {
    return <div className="text-center py-10">Project not found</div>;
  }

  return (
    <>
      <div className="h-24">
        <Nav />
      </div>
      <main className="px-20 w-full text-center md:px-52">
        <div>
          <div className="grid grid-cols-3">
            <div></div>
            <h1 className="self-center">{project.name}</h1>
            <span className="self-end flex justify-center items-center h-full">
              <a href={project.github}>
                <FaGithub className="ms-3" size={30} />
              </a>
              {project.devpost && (
                <a href={project.devpost}>
                  <Image
                    alt="Devpost"
                    src="/devpost.svg"
                    className="ms-3"
                    width={30}
                    height={30}
                  />
                </a>
              )}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="content text-nowrap justify-self-start"
              >
                <TbExternalLink className="ms-3" size={30} />
              </a>
            </span>
          </div>
          <p className="text-sm">{project.description}</p>
          {project.binary && (
            <>
              <Script
                src="https://cjrtnc.leaningtech.com/4.2/loader.js"
                strategy="afterInteractive"
                onError={() => {
                  console.error("Failed to load CheerpJ loader script");
                  setError("Failed to load terminal script.");
                }}
                onLoad={async () => {
                  try {
                    await cheerpjInit();

                    if (!terminalInstance.current && termRef.current) {
                      const term = new Terminal({
                        cols: 80,
                        rows: 24,
                        theme: { background: '#1e1e1e' },
                      });
                      term.open(termRef.current);
                      terminalInstance.current = term;

                      if (window.cheerpjSetNativeStdoutCallback) {
                        window.cheerpjSetNativeStdoutCallback((text) => {
                          term.write(text.replace(/\n/g, '\r\n'));
                        });
                      }
                      if (window.cheerpjSetNativeStderrCallback) {
                        window.cheerpjSetNativeStderrCallback((text) => {
                          term.write(text.replace(/\n/g, '\r\n'));
                        });
                      }

                      term.writeln(`$ java -jar ${project.binary}`);
                    }

                    cheerpjRunJar(project.binary, "Main");
                  } catch (e) {
                    console.error(e);
                    if (terminalInstance.current) {
                      terminalInstance.current.writeln(
                        `\r\nError: ${e.message}`
                      );
                    }
                    setError(e.message || "Terminal initialization error.");
                  }
                }}
              />

              <div className="mt-6 text-left">
                <div
                  ref={termRef}
                  className="mt-2 h-64 w-full rounded bg-gray-800"
                ></div>
              </div>
            </>
          )}
          <p>{project.techStack}</p>
          {"cad" in project && <div></div>}
        </div>
      </main>
    </>
  );
}
