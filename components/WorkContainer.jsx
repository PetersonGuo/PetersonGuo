import WorkCard from "./WorkCard";

const WorkData = [
	{
		title: "Security Developer",
		company: "eSentire",
		image: "/esentire.png",
		start: new Date("01/01/2024"),
		end: new Date("05/01/2024"),
		description: [
			"Directed the development of a key threat analytics dashboard, which has become a cornerstone project, significantly boosting client engagement through enhanced data visualization and automated reporting. The dashboard’s success has catalyzed a strategic shift towards advanced analytics solutions, making it a major topic of discussion among company executives and a pivotal part of our operational transformation.",
			"Enhanced data management efficiencies by developing a JSON-to-database conversion function, significantly improving the handling and processing of complex data structures.",
			"Led the automation of deployment processes across four major projects, enhancing efficiency by 10% through the strategic use of Terraform templates.",
			"Dramatically increased the efficiency of incident reporting functions by over 400%, enhancing data processing and storage capabilities through optimized algorithms.",
			"Enhanced the logging and security protocols for multiple projects, standardizing methods to ensure robust access control and system monitoring.",
			"Developed and contributed to an open-source PCAP scrubber project, enhancing tool capabilities by implementing features that remove sensitive information, thus facilitating safe and effective training for network analysts.",
		],
		location: "Remote",
	},
	{
		title: "Simulation Developer",
		company: "COBWEB",
		image: "/cobweb.png",
		start: new Date("06/01/2023"),
		end: new Date("09/01/2023"),
		description: [
			"Developed and maintained simulation models such as particle physics, computer vision, and spring-mass systems.",
			"Developed and optimized health-related research simulation models using C++ and Java, achieving a 15% reduction in memory usage and a 10 % increase in processing speed.",
		],
		location: "Toronto, ON",
	},
	{
		title: "Robotics Developer",
		company: "Trubotics",
		image: "/trubotics.png",
		start: new Date("05/01/2022"),
		end: new Date("06/01/2023"),
		description: [
			"Designed mechanical components using Fusion360, incorporating principles of mechanical design and software engineering. This demonstrated a blend of skills for optimal performance.",
			"Engineered competitive autonomous strategies through the development of C++ algorithms, using sensor technologies. This catapulted the competition ranking from 135th to 31st, showcasing expertise in sensor integration and algorithm development.",
		],
		location: "Markham, ON",
	},
];

export default function WorkContainer() {
	return (
		<>
			<div className={"space-y-2"}>
				{WorkData.map((data, i) => {
					return <WorkCard workData={data} key={`WorkCard${i}`} />;
				})}
			</div>
		</>
	);
}
