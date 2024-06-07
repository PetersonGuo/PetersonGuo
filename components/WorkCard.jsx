"use client";
import Image from "next/image";
import { MdOutlineChevronRight } from "react-icons/md";
import { useState } from "react";

function dateDifference(start, end) {
	// Calculate the differences in years, months, and days
	let years = end.getFullYear() - start.getFullYear();
	let months = end.getMonth() - start.getMonth() + 1;
	let days = end.getDate() - start.getDate();

	// Adjust months and years if necessary
	if (days < 0) {
		months -= 1;
		days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
	}

	if (months < 0) {
		years -= 1;
		months += 12;
	}

	// Construct the elapsed time string
	let elapsedTime = [];

	if (years > 0) {
		elapsedTime.push(`${years} yr${years > 1 ? "s" : ""}`);
	}

	if (months > 0) {
		elapsedTime.push(`${months} mo${months > 1 ? "s" : ""}`);
	}

	return elapsedTime.join(" ");
}

export default function WorkCard({ children, workData }) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<div
				className="flex flex-row items-center px-5 py-2 rounded-xl w-full bg-gray-900 justify-between cursor-pointer"
				onClick={() => {
					setOpen(!open);
				}}
			>
				<div className="flex flex-row items-center space-x-5">
					<div className="bg-white rounded-xl p-1">
						<Image
							alt={`${workData.company} ${workData.title}`}
							className="aspect-square"
							src={workData.image}
							width={40}
							height={40}
						/>
					</div>
					<div>
						<h4 className="text-lg font-bold">{workData.title}</h4>
						<div className="flex">
							<p className="lg:text-md text-sm font-normal">
								{`${workData.start.toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
								})} - ${workData.end.toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "short",
									}
								)}`}{" "}
								&#x2022;
							</p>
							<p className="text-sm ms-1">
								{dateDifference(workData.start, workData.end)}
							</p>
						</div>
					</div>
				</div>
				<MdOutlineChevronRight
					size={40}
					className={`ml-auto mr-0 transition-all ease-in-out ${
						open ? "rotate-90" : ""
					}`}
				/>
			</div>
			{open && (
				<ul className="text-sm list-disc px-8">
					{workData.description.map((item, i) => {
						return (
							<li key={`work_description_${i}`} className="py-2">
								<p>{item}</p>
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
}
