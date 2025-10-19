"use client";
import { cn } from "@/utils/cn";
import React from "react";
import Social from "@/components/Social";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
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
		<>
			<div className="w-full h-full">
				<div className={cn("sticky w-full top-[40vh]", className)}>
					<div className="relative">
						<p className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto">
							Hi, I'm
						</p>
						<TesseractViewer />
						<p className="text-5xl md:text-7xl font-normal md:pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300">
							{title}
						</p>
						{/* <p className="text-md md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto">
							{description}
						</p> */}
						<div className="absolute bottom-[-70%] w-full flex items-center justify-center bg-red-transparent space-x-2">
							<Social social="github">
								<FaGithub size={30} />
							</Social>
							<Social social="linkedin">
								<FaLinkedin size={30} />
							</Social>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
