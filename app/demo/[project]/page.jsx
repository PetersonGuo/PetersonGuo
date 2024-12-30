import Nav from "@/components/Nav";
import ProjectData from "@/components/ProjectData";
import { FaGithub } from "react-icons/fa";
import { TbExternalLink } from "react-icons/tb";
import Image from "next/image";

export default function Page({ params }) {
	const project = ProjectData.find(
		(project) => project.name.toLowerCase() === params.project
	);
	return (
		<>
			<div className={"h-24"}>
				<Nav />
			</div>
			<main className={"px-20 w-full text-center"}>
				{project ? (
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
											src={"/devpost.svg"}
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
									<TbExternalLink
										className="ms-3"
										size={30}
									/>
								</a>
							</span>
						</div>
						<p>{project.description}</p>
						<p>{project.techStack}</p>
					</div>
				) : (
					<h1>Project not found</h1>
				)}
			</main>
		</>
	);
}
