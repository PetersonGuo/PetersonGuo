"use client";
import "@/css/Nav.css";
import { useEffect, useState } from "react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function Nav() {
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(true);
	const [hasScrolled, setHasScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setHasScrolled(true);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		// Check if current is not undefined and is a number
		if (typeof current === "number") {
			let direction = current - scrollYProgress.getPrevious();

			if (scrollYProgress.get() < 0.05) {
				setVisible(true);
			} else {
				if (direction < 0) {
					setVisible(true);
				} else if (direction > 0 && hasScrolled) {
					setVisible(false);
				}
			}
		}
	});

	return (
		<AnimatePresence mode="wait">
			<motion.nav
				initial={{
					opacity: 1,
					y: 0,
				}}
				animate={{
					y: visible ? 0 : -100,
					opacity: visible ? 1 : 0,
				}}
				transition={{
					duration: 0.2,
				}}
				className={cn(
					"z-20 fixed grid grid-cols-3 items-center w-full h-20 px-8 top-3"
				)}
			>
				<Link href="/" className="name justify-self-start">
					Peterson Guo
				</Link>
				<ul className="flex items-center justify-self-center space-x-4">
					<li>
						<Link href="/#about" className="link">
							About
						</Link>
					</li>
					<li>
						<Link href="/projects" className="link">
							Projects
						</Link>
					</li>
					<li>
						<Link href="/#contact" className="link">
							Contact
						</Link>
					</li>
				</ul>
				<ul className="flex items-center justify-self-end space-x-4">
					<li>
						<Link
							href="/Peterson_Guo_Resume.pdf"
							target="_blank"
							className="link"
						>
							Resume
						</Link>
					</li>
					<li>
						<Link
							href="https://github.com/PetersonGuo"
							target={"_blank"}
							className="link"
						>
							GitHub
						</Link>
					</li>
					<li>
						<Link
							href="https://www.linkedin.com/in/petersonguo/"
							target={"_blank"}
							className="link"
						>
							LinkedIn
						</Link>
					</li>
				</ul>
			</motion.nav>
		</AnimatePresence>
	);
}
