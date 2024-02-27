"use client";
import { motion } from "framer-motion";

export default function WorkCard({
	children,
	title,
	description,
	time,
	company,
}) {
	const cardVariants = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
	};

	return (
		<motion.div
			variants={cardVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className={`rounded-xl overflow-hidden shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 even:justify-self-end w-[60%] justify-self-start even:ml-auto even:mr-0 my-5 ${
				company === "Current"
					? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
					: "bg-gray-100 text-gray-700"
			}`}
		>
			<div className="flex flex-col h-full px-4 py-3">
				<div className="flex flex-row justify-between">
					<h3 className="text-xl font-semibold">{title}</h3>
					<h4 className="text-sm font-medium">{company}</h4>
				</div>
				<h4 className="text-base font-medium">{time}</h4>
				<ul className="text-sm">
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
