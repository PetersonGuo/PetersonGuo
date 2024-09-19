import '@/css/Project.css';
import { SplideSlide } from "@splidejs/react-splide";
import { TbExternalLink } from "react-icons/tb";

export default function ProjectCard({ children, project, index, setHoveredIndex, setFlippedIndex, flippedIndex, isSlide }) {
    const Container = isSlide ? SplideSlide : "div";
    return (
		<Container
			key={`Project${index}`}
			className="box flex-none transition-all duration-300 ease-in-out"
			style={{ scrollSnapAlign: "start" }}
			onMouseEnter={(e) => {
				setHoveredIndex(index);
			}}
			onMouseLeave={(e) => {
				setHoveredIndex(null);
				setFlippedIndex(null);
			}}
		>
			{flippedIndex === index ? (
				<a
					href={project.link}
					target="_blank"
					rel="noopener noreferrer"
					className="content text-nowrap"
				>
					<h2 className="flex flex-row items-center text-nowrap z-2">
						View Project <TbExternalLink className="ms-3" />
					</h2>
				</a>
			) : (
				<div className="content text-nowrap">
					<h2>{project.name}</h2>
				</div>
			)}
		</Container>
	);
}