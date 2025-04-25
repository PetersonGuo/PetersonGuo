import WorkCard from "./WorkCard";

const WorkData = [
	{
		title: "Software Engineer Intern",
		company: "AMD",
		image: "/amd.png",
		start: new Date("09/09/2024"),
		end: new Date("12/22/2024"),
		description: [
			"Developed kernel drivers in C and C++ for next-gen AMD graphics units, enhancing hardware compatibility and performance by ensuring efficient communication between the GPU/APU and display.",
			"Triaged over 60 software bugs in 3 months, utilizing kernel debugging, memory dumping, and hardware register analysis",
			"Diagnosed and resolved critical issues including BSODs, system hangs, races, and visual rendering anomalies in display drivers and GPU firmware.",
			"Experimented with high performance compute optimizations in low-level systems programming and interaction with Windows 11 API and hardware abstraction layers.",
			"Analyzed firmware interactions, memory crash dumps and live kernel debug sessions to identify root causes of initialization failures, performance bottlenecks, and power management issues.",
			"Contributed to open-source AMD driver code which can be found in the Linux kernel.",
			"Led the development of a lightweight ML-based upscaling PoC, integrating temporal and spatial optimization techniques to enhance display pipeline efficiency."
		],
	},
	{
		title: "Security Developer",
		company: "eSentire",
		image: "/esentire.png",
		start: new Date("01/01/2024"),
		end: new Date("05/01/2024"),
		description: [
			"Developed a threat analytics dashboard that significantly boosted engagement through enhanced data visualization and automated reporting, becoming a key project and driving strategic adoption of advanced analytics.",
			"Automated data entry using a JSON-to-database conversion function, improving its speed by over 50% by implementing recursion and efficient data structures.",
			"Automated deployment processes across 4 major projects, reducing manual operation by approximately 30% through the use of infrastructure as code and CI/CD practices.",
			"Dramatically enhanced data processing speed of logging functions by over 400% by using data structures and algorithms and list comprehension.",
			"Enhanced the logging and security protocols for multiple projects by implementing 3 standardized methods to ensure robust access control and system monitoring.",
			"Developed an open-source, multi-threaded GUI PCAP scrubber, adding over 10 functionalities such as multiple instances, text editing, automatic checksum validation, autosave, and find and replace to enhance user experience.",
		],
		location: "Remote",
	},
	{
		title: "Software Developer",
		company: "COBWEB",
		image: "/cobweb.png",
		start: new Date("06/01/2023"),
		end: new Date("09/01/2023"),
		description: [
			"Developed 4 new simulation models such as particle physics, computer vision, and spring-mass systems using OpenCV, NumPy, and Python.",
			"Maintained a genetic algorithm for health-related research simulation models using Java, achieving a 15% reduction in memory usage and a 10% increase in processing speed by improving multithreaded performance.",
		],
		location: "Toronto, ON",
	},
	{
		title: "Software Engineer",
		company: "Trubotics",
		image: "/trubotics.png",
		start: new Date("05/01/2022"),
		end: new Date("06/01/2023"),
		description: [
			"Catapulted the competition ranking from 135th to 31st by engineering competitive autonomous strategies using torque sensors, motors, and gyros with algorithms optimized for real-time processing such as pathfinding and PID.",
			"Accomplished a 25% reduction in error rates, as measured by thorough testing and debugging of software modules, by creating software tests and rigorous debugging protocols.",
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
