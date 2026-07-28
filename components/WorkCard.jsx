"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TbChevronRight, TbExternalLink } from "react-icons/tb";

function dateDifference(start, end) {
	let years = end.getFullYear() - start.getFullYear();
	let months = end.getMonth() - start.getMonth() + 1;
	let days = end.getDate() - start.getDate();

	if (days < 0) {
		months -= 1;
		days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
	}
	if (months < 0) {
		years -= 1;
		months += 12;
	}

	const parts = [];
	if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
	if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
	return parts.join(" ");
}

const month = (d) =>
	d.toLocaleDateString("en-US", { year: "numeric", month: "short" });

export default function WorkCard({ workData }) {
	const [open, setOpen] = useState(false);

	const now = new Date();
	const status =
		workData.start > now
			? { label: "Incoming", tone: "border-blue-400/40 bg-blue-500/15 text-blue-200" }
			: workData.end > now
			? { label: "Current", tone: "border-green-400/40 bg-green-500/15 text-green-200" }
			: null;

	const hasDetails = workData.description?.length > 0;
	const link = /^https?:\/\//.test(workData.link ?? "") ? workData.link : null;

	return (
		<div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-colors hover:border-white/20">
			<button
				type="button"
				onClick={() => hasDetails && setOpen((v) => !v)}
				aria-expanded={hasDetails ? open : undefined}
				disabled={!hasDetails}
				className="flex w-full items-center gap-3 px-4 py-4 text-left disabled:cursor-default sm:gap-4 sm:px-5"
			>
				{/* Wider than tall: most of these are wordmarks, which a square
				    tile shrinks badly. width/height below are resolution hints for
				    next/image -- the CSS box controls the displayed size. */}
				<span className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 sm:h-16 sm:w-24 sm:rounded-xl sm:p-2.5">
					<Image
						alt={`${workData.company} logo`}
						className="h-full w-full object-contain"
						src={workData.image}
						width={192}
						height={128}
					/>
				</span>

				<span className="min-w-0 flex-1">
					<span className="flex flex-wrap items-center gap-x-2 gap-y-1">
						<span className="text-base font-semibold leading-snug text-white">
							{workData.title}
						</span>
						{status && (
							<span
								className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${status.tone}`}
							>
								{status.label}
							</span>
						)}
					</span>

					<span className="mt-0.5 block text-sm text-gray-300">
						{workData.company}
						{workData.location && (
							<span className="text-gray-500"> · {workData.location}</span>
						)}
					</span>

					<span className="mt-1 block font-mono text-xs text-gray-500">
						{month(workData.start)} &ndash; {month(workData.end)}
						{" · "}
						{dateDifference(workData.start, workData.end)}
					</span>
				</span>

				{hasDetails && (
					<TbChevronRight
						size={22}
						className={`shrink-0 text-gray-500 transition-transform duration-300 group-hover:text-gray-300 ${
							open ? "rotate-90" : ""
						}`}
					/>
				)}
			</button>

			<AnimatePresence initial={false}>
				{open && hasDetails && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: "easeInOut" }}
						className="overflow-hidden"
					>
						<div className="border-t border-white/10 px-5 py-4">
							<ul className="space-y-2.5">
								{workData.description.map((item, i) => (
									<li
										key={`work_description_${i}`}
										className="flex gap-3 text-sm leading-relaxed text-gray-400"
									>
										<span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400/70" />
										<span>{item}</span>
									</li>
								))}
							</ul>

							{/* The logo used to be a link nested inside the toggle, which is
							    invalid markup and fired both actions on one click. */}
							{link && (
								<a
									href={link}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-white"
								>
									Visit {workData.company}
									<TbExternalLink size={13} />
								</a>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
