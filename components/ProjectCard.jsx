import '@/css/Project.css';
import { SplideSlide } from "@splidejs/react-splide";
import { TbExternalLink } from "react-icons/tb";
import { MdTerminal } from "react-icons/md";
import { TbBox } from "react-icons/tb";
import Link from "next/link";

export default function ProjectCard({ children, project, index, setHoveredIndex, setFlippedIndex, flippedIndex, isSlide, className }) {
	const Container = isSlide ? SplideSlide : "div";
	const hasDemo = !!(project.terminal || project.cad);
	const demoLabel =
		project.terminal && project.cad
			? "Terminal + 3D"
			: project.terminal
			? "Live terminal"
			: "3D model";

	return (
		<Container
			key={`Project${index}`}
			className={`box flex-none transition-all duration-300 ease-in-out ${className}`}
			style={{ scrollSnapAlign: "start" }}
			onMouseEnter={() => setHoveredIndex(index)}
			onMouseLeave={() => {
				setHoveredIndex(null);
				setFlippedIndex(null);
			}}
		>
			{flippedIndex === index ? (
				<div className="content flex-col gap-2.5">
					{hasDemo && (
						<Link
							href={`/demo/${project.id}`}
							className="group/btn inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/15 px-4 py-1.5 text-sm font-medium text-blue-100 backdrop-blur-sm transition-all hover:border-blue-300/70 hover:bg-blue-500/25"
						>
							{project.terminal ? <MdTerminal size={15} /> : <TbBox size={15} />}
							Try it live
						</Link>
					)}
					<a
						href={project.link}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
					>
						View project
						<TbExternalLink size={14} />
					</a>
				</div>
			) : (
				<div className="content flex-col gap-2">
					<h2>{project.name}</h2>
					{hasDemo && (
						<span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/75 backdrop-blur-sm">
							<span className="relative flex h-1.5 w-1.5">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-70" />
								<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400" />
							</span>
							{demoLabel}
						</span>
					)}
				</div>
			)}
		</Container>
	);
}
