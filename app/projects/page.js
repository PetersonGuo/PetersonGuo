"use client";
import Nav from "@/components/Nav";
import ProjectGridCard from "@/components/ProjectGridCard";
import ProjectData from "@/components/ProjectData";

export default function Page() {
	const demoCount = ProjectData.filter((p) => p.terminal || p.cad).length;

	return (
		<>
			<div className={"h-24"}>
				<Nav />
			</div>

			{/* Ambient glow behind the header */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,120,255,0.16),transparent_70%)]"
			/>

			<main className="mx-auto w-full max-w-6xl px-6 pb-28 sm:px-8">
				<header className="border-b border-white/10 pb-10 text-center">
					<h1 className="bg-gradient-to-br from-white via-white to-white/55 bg-clip-text text-4xl leading-tight text-transparent sm:text-5xl">
						Projects
					</h1>
					<p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-400">
						Things I&apos;ve built across embedded systems, machine learning and
						the web.{" "}
						{demoCount > 0 && (
							<span className="text-gray-300">
								{demoCount} of them run right here in your browser.
							</span>
						)}
					</p>
				</header>

				<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{ProjectData.map((project, i) => (
						<ProjectGridCard key={project.id ?? `Project${i}`} project={project} />
					))}
				</div>
			</main>
		</>
	);
}
