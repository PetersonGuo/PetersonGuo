"use client";
import { cn } from "@/utils/cn";
import {
	motion,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const TracingBeam = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	// track velocity of scroll to increase or decrease distance between svg gradient y coordinates.
	const scrollYProgressVelocity = useVelocity(scrollYProgress);
	const [velo, setVelocity] = useState(0);
	const [windowWidth, setWindowWidth] = useState(0);

	const contentRef = useRef<HTMLDivElement>(null);

	const [svgHeight, setSvgHeight] = useState(0);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setWindowWidth(window.innerWidth);
		});
		return () => {
			window.removeEventListener("resize", () => {
				setWindowWidth(window.innerWidth);
			});
		};
	}, []);

	useEffect(() => {
		const updateHeight = () => {
			if (contentRef.current) {
				setSvgHeight(contentRef.current.scrollHeight);
			}
		};
		updateHeight();

		const observer = new MutationObserver(updateHeight);
		if (contentRef.current) {
			observer.observe(contentRef.current, {
				childList: true,
				subtree: true,
			});
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		const unsubscribe = scrollYProgressVelocity.on(
			"change",
			(latestVelocity) => {
				setVelocity(latestVelocity);
			}
		);
		return () => unsubscribe();
	}, [scrollYProgressVelocity]);

	const y1 = useSpring(
		useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
		{
			stiffness: 500,
			damping: 90,
		}
	);
	const y2 = useSpring(
		useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
		{
			stiffness: 500,
			damping: 90,
		}
	);

	return (
		<motion.div
			ref={ref}
			className={cn(`relative w-full max-w-4xl mx-auto`, className)}
			style={{ height: `${svgHeight}px` }}
		>
			<div className="absolute -left-20 top-3">
				<motion.div
					transition={{
						duration: 0.2,
						delay: 0.5,
					}}
					style={{
						boxShadow:
							scrollYProgress.get() > 0
								? "none"
								: "rgba(220, 154, 154, 0.24) 0px 3px 8px",
					}}
					className="ml-[27px] h-4 w-4 rounded-full border border-netural-200 shadow-sm flex items-center justify-center"
				>
					<motion.div
						transition={{
							duration: 0.2,
							delay: 0.5,
						}}
						style={{
							backgroundColor:
								scrollYProgress.get() > 0
									? "white"
									: "var(--emerald-500)",
							borderColor:
								scrollYProgress.get() > 0
									? "white"
									: "var(--emerald-600)",
						}}
						className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
					/>
				</motion.div>
				<svg
					viewBox={`0 0 20 ${svgHeight}`}
					width="20"
					height={svgHeight} // Set the SVG height
					className=" ml-4 hidden lg:block"
					aria-hidden="true"
				>
					<motion.path
						d={`M 1 0V -36 l 18 24 V ${
							svgHeight * 0.8
						} l -18 24V ${svgHeight}`}
						fill="none"
						stroke="#9091A0"
						strokeOpacity="0.16"
						transition={{
							duration: 10,
						}}
					></motion.path>
					<motion.path
						d={`M 1 0V -36 l 18 24 V ${
							svgHeight * 0.8
						} l -18 24V ${svgHeight}`}
						fill="none"
						stroke="url(#gradient)"
						strokeWidth="1.25"
						className="motion-reduce:hidden"
						transition={{
							duration: 10,
						}}
					></motion.path>
					<defs>
						<motion.linearGradient
							id="gradient"
							gradientUnits="userSpaceOnUse"
							x1="0"
							x2="0"
							y1={y1} // set y1 for gradient
							y2={y2} // set y2 for gradient
						>
							<stop stopColor="#18CCFC" stopOpacity="0"></stop>
							<stop stopColor="#18CCFC"></stop>
							<stop offset="0.325" stopColor="#6344F5"></stop>
							<stop
								offset="1"
								stopColor="#AE48FF"
								stopOpacity="0"
							></stop>
						</motion.linearGradient>
					</defs>
				</svg>
			</div>
			<div ref={contentRef}>{children}</div>
		</motion.div>
	);
};
