import WorkCard from "./WorkCard";

const WorkData = [
	{
		title: "Model Performance Intern",
		company: "Baseten",
		image: "https://dzh2zima160vx.cloudfront.net/logo/aaa340387ade367703b1e49f53eb3028_304_160?Expires=1861920000&Signature=tzh4CAeWOS5gZNHx1zpz82~IV-F9F7k-e4SkQF9bDMWT0bBkeVNeUhMtjqwKYj7uipWvENmA0BVOw83Nie6hcYn5lg0gsaz7eKmCJKTncTmCmM1Rx-xk~1YeOOrYy5UFLoii-Pcv-cGIEetCnIhSrcGPVbzRuBLObFpiqHXDZoI5WAuzH73XcN56onips9670p7b4-YbNRtcCHBE4uDdk3IN~VfsMLm5uB2hs5N5OSC11bpkNfwbJ5RHffCEHkrXzG1Y0~5tSRRb1eADrgKJ3NT4WBhT3lxXMmu0SJYoPscfFitBo~eYrDn5hx6BiKROS7tbf4pyhR1PLVixPLxffA__&Key-Pair-Id=APKAII5OVX4LZ3WT422Q",
		start: new Date("01/05/2026"),
		end: new Date("05/08/2026"),
		description: [
			"Incoming"
		],
		location: "San Francisco, CA",
		link: "https://baseten.co/",
	},
	{
		title: "Compiler Engineer Intern",
		company: "Nvidia",
		image: "https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png",
		start: new Date("05/01/2025"),
		end: new Date("12/26/2025"),
		description: [
			"Developed and integrated custom AI kernels for a Python-based ML compiler into the LLM inference path, delivering up to 2.67x speedups by reducing memory traffic and kernel-launch overhead",
			"Enhanced AI kernel fusion passes by introducing new fusion algorithm and graph patterns, securing an additional 0.7% inference speedup on multi-billion parameter LLM models",
			"Extended the MLIR-based CUDA dialect, adding 20+ ops with result-handling semantics, lowerings, and tests, extending CUDA, enabling Python DSL operators to use advanced features on Rubin, Feynman, and Blackwell GPUs",
			"Validated CUTLASS/Collective IR kernels in MLIR to ensure correct lowering and codegen, exercising tensor-compute and data-movement pipelines across next-gen GPU architectures.",
			"Decomposed end-to-end LLM graph latency with Nsight Systems/Compute to isolate kernel, scheduler, and memory stall contributors for targeted remediation",
			"Writing custom AI kernels for zero-day LLM models, reducing launch-time performance bottlenecks for next-gen deployments"
		],
		location: "Toronto, ON",
		link: "https://www.nvidia.com/",
	},
	{
		title: "Software Engineer Intern",
		company: "AMD",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/800px-AMD_Logo.svg.png",
		start: new Date("09/09/2024"),
		end: new Date("12/22/2024"),
		description: [
			"Proposed and prototyped a lightweight ML-based upscaling PoC using PyTorch, ROCm, and Python, which was later extended into an internal tech conference shaping future display pipeline research",
			"Developed kernel drivers in C and C++ for next-gen AMD graphics units, improving hardware compatibility and performance between the GPU/APU frame buffer and display",
			"Resolved 25+ kernel-level GPU issues such as crashes, hangs, stability, and performance, leveraging WinDbg, crash dumps, hardware register analysis, ETL traces, and firmware traces, enhancing system responsiveness and stability for the Navi4x and Ryzen AI APU launch achieving the most stable GPU software release, validated by QA testing",
			"Partnered with Microsoft OS team to optimize OS-GPU interactions in 5+ tickets, analyzing firmware and memory dumps, resolving initialization failures and performance bottlenecks to ensure full-stack stability",
			"Contributed to Linux’s open-source AMD display driver, addressing visual corruption, color calibration, frame synchronization, DSC, and display pipeline issues.",
		],
		location: "Markham, ON",
		link: "https://www.amd.com/",
	},
	{
		title: "Security Developer",
		company: "eSentire",
		image: "https://georgian.io/wp-content/uploads/2017/07/eSentire_Logo_2021_Blue.png",
		start: new Date("01/01/2024"),
		end: new Date("05/01/2024"),
		description: [
			"Solely designed and delivered an AI threat analytics dashboard, building full-stack data pipelines in Snowflake, Python, and Vue3, that enabled enterprise clients to visualize real-time security threats",
			"Dashboard success gained executive visibility, leading to VP-level strategy discussions on advanced analytics adoption.",
			"Cut ingestion latency by 50%+ by optimizing JSON parsing and Snowflake queries, improving automation and responsiveness for high-volume threat data.",
			"Boosted log-processing speed by 400% through algorithmic optimizations in Python, improving scalability of the analytics platform",
			"Enhanced analyst productivity by extending an open-source PCAP scrubber with 10+ new features like, GUI, autosave, checksum validation, and multi-tasking",
		],
		location: "Waterloo, ON",
		link: "https://www.esentire.com/",
	},
	// {
	// 	title: "Software Developer",
	// 	company: "COBWEB",
	// 	image: "/cobweb.png",
	// 	start: new Date("06/01/2023"),
	// 	end: new Date("09/01/2023"),
	// 	description: [
	// 		"Developed 4 new simulation models such as particle physics, computer vision, and spring-mass systems using OpenCV, NumPy, and Python.",
	// 		"Maintained a genetic algorithm for health-related research simulation models using Java, achieving a 15% reduction in memory usage and a 10% increase in processing speed by improving multithreaded performance.",
	// 	],
	// 	location: "Toronto, ON",
	// },
	// {
	// 	title: "Software Engineer",
	// 	company: "Trubotics",
	// 	image: "/trubotics.png",
	// 	start: new Date("05/01/2022"),
	// 	end: new Date("06/01/2023"),
	// 	description: [
	// 		"Catapulted the competition ranking from 135th to 31st by engineering competitive autonomous strategies using torque sensors, motors, and gyros with algorithms optimized for real-time processing such as pathfinding and PID.",
	// 		"Accomplished a 25% reduction in error rates, as measured by thorough testing and debugging of software modules, by creating software tests and rigorous debugging protocols.",
	// 	],
	// 	location: "Markham, ON",
	// },
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
