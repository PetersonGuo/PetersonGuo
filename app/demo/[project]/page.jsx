"use client";
import Nav from "@/components/Nav";
import ProjectData from "@/components/ProjectData";
import { FaGithub } from "react-icons/fa";
import { TbExternalLink, TbBox, TbArrowLeft } from "react-icons/tb";
import { MdTerminal } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import dynamic from "next/dynamic";

const TerminalEmulator = dynamic(
  () => import("@/components/TerminalEmulator"),
  { ssr: false }
);
const STLViewer = dynamic(() => import("@/components/STLViewer"), {
  ssr: false,
});

const isUrl = (s) => typeof s === "string" && /^https?:\/\//.test(s);

function SectionHeading({ icon, title, subtitle }) {
  return (
    <div className="mb-1 flex items-baseline gap-3">
      <h2 className="flex items-center gap-2.5 text-xl">
        <span className="text-blue-400">{icon}</span>
        {title}
      </h2>
      <span className="text-xs text-gray-500">{subtitle}</span>
    </div>
  );
}

export default function Page() {
  const { project: projectId } = useParams();
  const project = useMemo(
    () => ProjectData.find((p) => p.id === projectId) ?? null,
    [projectId]
  );

  if (!project) {
    return (
      <>
        <div className="h-24">
          <Nav />
        </div>
        <main className="mx-auto w-full max-w-5xl px-6 py-24 text-center">
          <h1 className="mb-3">Project not found</h1>
          <p className="mb-8 text-base text-gray-400">
            No project matches “{projectId}”.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <TbArrowLeft size={16} />
            Back to projects
          </Link>
        </main>
      </>
    );
  }

  const githubUrl =
    project.github ?? (isUrl(project.link) && project.link.includes("github.com")
      ? project.link
      : null);
  const siteUrl =
    isUrl(project.link) && !project.link.includes("github.com")
      ? project.link
      : null;
  // Some entries use `link` for a note rather than a URL.
  const linkNote = !isUrl(project.link) ? project.link : null;

  const badges = [
    project.terminal && { icon: <MdTerminal size={12} />, label: "Live terminal" },
    project.cad && { icon: <TbBox size={12} />, label: "3D model" },
  ].filter(Boolean);

  const action =
    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors";

  return (
    <>
      <div className="h-24">
        <Nav />
      </div>

      {/* Ambient glow behind the header */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,120,255,0.16),transparent_70%)]"
      />

      <main className="mx-auto w-full max-w-5xl px-6 pb-28 sm:px-8">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-300"
        >
          <TbArrowLeft
            size={15}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          All projects
        </Link>

        <header className="mt-6 border-b border-white/10 pb-10">
          {badges.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-200"
                >
                  {b.icon}
                  {b.label}
                </span>
              ))}
            </div>
          )}

          <h1 className="bg-gradient-to-br from-white via-white to-white/55 bg-clip-text text-4xl leading-tight text-transparent sm:text-5xl">
            {project.name}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
            {project.description}
          </p>

          {project.tech?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-gray-400"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${action} border-white/20 bg-white/5 text-white/85 hover:border-white/35 hover:bg-white/10 hover:text-white`}
              >
                <FaGithub size={16} />
                Source
              </a>
            )}
            {project.devpost && (
              <a
                href={project.devpost}
                target="_blank"
                rel="noopener noreferrer"
                className={`${action} border-white/20 bg-white/5 text-white/85 hover:border-white/35 hover:bg-white/10 hover:text-white`}
              >
                <Image alt="" src="/devpost.svg" width={16} height={16} />
                Devpost
              </a>
            )}
            {siteUrl && (
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${action} border-blue-400/40 bg-blue-500/15 text-blue-100 hover:border-blue-300/70 hover:bg-blue-500/25`}
              >
                <TbExternalLink size={16} />
                Visit site
              </a>
            )}
            {linkNote && (
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-500">
                {linkNote}
              </span>
            )}
          </div>
        </header>

        {project.cad && (
          <section className="mt-12">
            <SectionHeading
              icon={<TbBox size={18} />}
              title="CAD model"
              subtitle="rendered in your browser"
            />
            <STLViewer cad={project.cad} />
          </section>
        )}

        {project.terminal && (
          <section className="mt-12">
            <SectionHeading
              icon={<MdTerminal size={18} />}
              title="Interactive demo"
              subtitle={
                project.terminal.type === "java"
                  ? "runs a real JVM in your browser"
                  : "runs Python in your browser"
              }
            />
            <TerminalEmulator config={project.terminal} />
          </section>
        )}
      </main>
    </>
  );
}
