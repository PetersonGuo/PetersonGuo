"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WorkCard({
	children,
	title,
	description,
	time,
	company,
	image,
}) {
	const cardVariants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0, transition: { duration: 0.3 } },
	};

	return (
		<motion.div
			variants={cardVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className={`rounded-xl overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 even:justify-self-end md:w-[60%] sm:w-full justify-self-start even:ml-auto even:mr-0 my-5 ${
				company === "Current"
					? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
					: "bg-[var(--secondary-bg)] text-white"
			}`}
		>
			<div className="flex flex-col h-full px-10 py-6">
				<div className="flex flex-row justify-between">
					<h3 className="text-2xl font-semibold">{title}</h3>
					<h4 className="text-md font-medium">{company}</h4>
				</div>
				<span className="flex row justify-between">
					<h4 className="text-base font-medium">{time}</h4>
					<Image
						className=""
						src={image}
						alt={company}
						width={30}
						height={20}
					/>
				</span>
				<ul className="text-sm list-disc px-4">
					{description.map((item, i) => {
						return (
							<li key={`work_description_${i}`} className="py-2">
								<p>{item}</p>
							</li>
						);
					})}
				</ul>
			</div>
		</motion.div>
	);
}
