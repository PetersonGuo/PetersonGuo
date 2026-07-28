"use client";
import { cn } from "@/utils/cn";
import React from "react";
import Social from "@/components/Social";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbChevronDown } from "react-icons/tb";
import TesseractViewer from "@/components/tesseract";

export default function Hero({
	title,
	description,
	className,
}: {
	title?: string;
	description?: React.ReactNode;
	className?: string;
}) {
	return (
		<div className="w-full h-full">
			<div className={cn("sticky top-[38vh] w-full", className)}>
				{/* Full-viewport background canvas */}
				<TesseractViewer />

				<div className="relative flex flex-col items-center gap-4 px-6 text-center">
					<p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-500 md:text-xs">
						Hi, I&apos;m
					</p>

					<h1 className="bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-5xl font-normal leading-tight text-transparent md:text-7xl">
						{title}
					</h1>

					{description && (
						<div className="max-w-xl text-base text-neutral-400 md:text-xl">
							{description}
						</div>
					)}

					{/* Previously pinned with `absolute bottom-[-70%]`, which drifted
					    with viewport height. Kept in normal flow instead. */}
					<div className="mt-2 flex items-center gap-3">
						<Social social="github">
							<span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-white/35 hover:text-white">
								<FaGithub size={20} />
							</span>
						</Social>
						<Social social="linkedin">
							<span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-white/35 hover:text-white">
								<FaLinkedin size={20} />
							</span>
						</Social>
					</div>

					<a
						href="#about"
						aria-label="Scroll to about"
						className="mt-8 flex flex-col items-center gap-1 text-neutral-600 transition-colors hover:text-neutral-300"
					>
						<span className="text-[10px] uppercase tracking-[0.25em]">
							Scroll
						</span>
						<TbChevronDown size={18} className="animate-bounce" />
					</a>
				</div>
			</div>
		</div>
	);
}
