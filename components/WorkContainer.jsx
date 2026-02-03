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
		image: "https://s3.amazonaws.com/cms.ipressroom.com/219/files/202512/692f50553d6332b453bbc5c2_nvidia-logo-vert-blk/nvidia-logo-vert-blk_thmb.png",
		start: new Date("05/01/2025"),
		end: new Date("12/26/2025"),
		description: [
			"Reduced JIT compilation time by ∼19.5% by designing a deterministic parallel Merkle-tree hashing system ∼5× faster than SHA256 for multi-GB binaries, improving kernel generation latency and iteration speed",
			"Cut kernel launch overhead by ∼60% by profiling the CUTLASS compiler/runtime pipeline, removing slow paths, and applying targeted micro-optimizations, significantly reducing Python→C++ dispatch cost in launch-bound workloads to within 10% of competitors",
			"Built core infrastructure for Nvidia’s MLIR-based CUDA dialect, adding 20+ IR ops, enums, and lowering patterns (CUDA Graphs and streams, async memops, pointer ops) enabling Python DSL users to target advanced features on Rubin, Feynman, and Blackwell GPUs ahead of upstream MLIR",
			"Improved GPU throughput in LLM workloads by converting Blackwell-tuned kernels that reduce launch overhead and improve integration with JIT kernel generation",
			"Performed end-to-end latency decomposition using Nsight Systems, Nsight Compute, CPU profilers, and Perfetto, isolating launch cost, Python overhead, compiler time, contention, scheduling stalls, and memory-stall contributors to guide fixes across the stack",
			"Delivered up to 2.67× faster LLM inference by integrating custom kernels into a Python-based ML JIT-compiler, reducing memory traffic and launch volume, and improving fusion heuristics for an additional 0.7% speedup on multi-billion parameter models"
		],
		location: "Toronto, ON - Santa Clara, CA",
		link: "https://www.nvidia.com/",
	},
	{
		title: "Software Engineer Intern",
		company: "AMD",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/800px-AMD_Logo.svg.png",
		start: new Date("09/09/2024"),
		end: new Date("12/22/2024"),
		description: [
			"Shaped display-pipeline research, shown by my ML upscaling PoC being adopted and later expanded into an internal technical conference paper by my successor, by building a lightweight PyTorch/ROCm prototype",
			"Strengthened display-pipeline stability on next-gen AMD GPUs/APUs by building C/C++ kernel drivers, ensuring robust framebuffer→display behavior for Ryzen AI and Radeon hardware",
			"Delivered AMD’s most stable GPU software release, by resolving 25+ kernel-level crashes, hangs, and performance regressions, using WinDbg, crash dumps, ETL traces, firmware logs, and register-level analysis",
			"Improved bring-up reliability by fixing 5+ Microsoft OS–GPU issues, analyzing firmware/memory dumps and eliminating early-boot bottlenecks",
			"Enhanced Linux display pipeline correctness, by resolving defects in color calibration, frame-sync logic, DSC decoding, and corruption, contributing patches to AMD’s open-source Linux display driver",
		],
		location: "Markham, ON",
		link: "https://www.amd.com/",
	},
	{
		title: "Security Developer",
		company: "eSentire",
		image: "https://s3.ca-central-1.amazonaws.com/esentire-dot-com-assets/assets/eSentire_emblem_512x512.jpg",
		start: new Date("01/01/2024"),
		end: new Date("05/01/2024"),
		description: [
			"Cut ingestion latency by 50%+ by optimizing JSON parsing and Snowflake execution paths, reducing pipeline stalls in real-time analytics",
			"Improved log-processing throughput by 4× through algorithmic optimizations in Python’s data pipeline",
			"Built an AI threat analytics dashboard end-to-end (Snowflake, Python, Vue3) used by enterprise clients to investigate live security events, earning executive visibility",
			"Strengthened analyst workflows by adding packet-processing and correctness enhancements to an open-source PCAP scrubber",
		],
		location: "Waterloo, ON",
		link: "https://www.esentire.com/",
	},
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
