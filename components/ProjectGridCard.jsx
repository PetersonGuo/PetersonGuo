import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { TbExternalLink, TbBox, TbArrowRight } from "react-icons/tb";
import { MdTerminal } from "react-icons/md";

const isUrl = (s) => typeof s === "string" && /^https?:\/\//.test(s);
const MAX_TECH = 5;

export default function ProjectGridCard({ project }) {
	const hasDemo = !!(project.terminal || project.cad);

	const githubUrl =
		project.github ??
		(isUrl(project.link) && project.link.includes("github.com")
			? project.link
			: null);
	const siteUrl =
		isUrl(project.link) && !project.link.includes("github.com")
			? project.link
			: null;

	const tech = project.tech ?? [];
	const shownTech = tech.slice(0, MAX_TECH);
	const extraTech = tech.length - shownTech.length;

	const badges = [
		project.terminal && { icon: <MdTerminal size={11} />, label: "Live terminal" },
		project.cad && { icon: <TbBox size={11} />, label: "3D model" },
	].filter(Boolean);

	return (
		<article className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]">
			{/* Hover glow */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(56,120,255,0.18),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			/>

			<div className="relative flex flex-1 flex-col">
				{badges.length > 0 && (
					<div className="mb-3 flex flex-wrap gap-1.5">
						{badges.map((b) => (
							<span
								key={b.label}
								className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-200"
							>
								{b.icon}
								{b.label}
							</span>
						))}
					</div>
				)}

				<h2 className="mb-2 text-xl leading-snug text-white">{project.name}</h2>

				<p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-400">
					{project.description}
				</p>

				{shownTech.length > 0 && (
					<div className="mb-5 flex flex-wrap gap-1.5">
						{shownTech.map((t) => (
							<span
								key={t}
								className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-gray-400"
							>
								{t}
							</span>
						))}
						{extraTech > 0 && (
							<span className="px-1 py-0.5 font-mono text-[11px] text-gray-600">
								+{extraTech}
							</span>
						)}
					</div>
				)}

				{/* Footer pinned to the bottom so cards line up regardless of text length */}
				<div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
					{hasDemo ? (
						<Link
							href={`/demo/${project.id}`}
							className="group/cta inline-flex items-center gap-1.5 text-sm font-medium text-blue-300 transition-colors hover:text-blue-200"
						>
							Try it live
							<TbArrowRight
								size={15}
								className="transition-transform group-hover/cta:translate-x-0.5"
							/>
						</Link>
					) : (
						<span className="text-xs text-gray-600">
							{isUrl(project.link) ? "" : project.link}
						</span>
					)}

					<div className="flex items-center gap-3 text-gray-500">
						{githubUrl && (
							<a
								href={githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`${project.name} source on GitHub`}
								className="transition-colors hover:text-white"
							>
								<FaGithub size={17} />
							</a>
						)}
						{project.devpost && (
							<a
								href={project.devpost}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`${project.name} on Devpost`}
								className="opacity-60 transition-opacity hover:opacity-100"
							>
								<Image alt="" src="/devpost.svg" width={17} height={17} />
							</a>
						)}
						{siteUrl && (
							<a
								href={siteUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Visit ${project.name}`}
								className="transition-colors hover:text-white"
							>
								<TbExternalLink size={17} />
							</a>
						)}
					</div>
				</div>
			</div>
		</article>
	);
}
