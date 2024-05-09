"use client";
import "@/css/Nav.css";
import { cn } from "@/utils/cn";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
	{ name: "About", href: "/#about", current: true },
	{ name: "Projects", href: "/projects", current: false },
	{ name: "Contact", href: "/#contact", current: false },
];

const links = [
	{ name: "Resume", href: "/Peterson_Guo_Resume.pdf" },
	{ name: "GitHub", href: "https://github.com/PetersonGuo" },
	{ name: "LinkedIn", href: "https://www.linkedin.com/in/petersonguo/" },
]

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Nav() {
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(true);
	const [hasScrolled, setHasScrolled] = useState(false);

	useEffect(() => {
		if (window.screen.width >= 768) {
			const handleScroll = () => {
				if (window.scrollY > 50) {
					setHasScrolled(true);
				}
			};
			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}
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
		<>
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
						"z-20 fixed flex flex-col justify-center md:grid grid-cols-3 items-center w-full h-20 md:px-8 py-3 bg-black !opacity-95"
					)}
				>
					<Link href="/" className="name justify-self-start">
						Peterson Guo
					</Link>
					<ul className="flex items-center justify-self-center space-x-4">
						{navigation.map((item) => (
							<li key={item.name}>
								<Link href={item.href} className={"link"}>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
					<ul className="flex items-center justify-self-end space-x-4">
						{links.map((item) => (
							<li key={item.name}>
								<Link href={item.href} target="_blank" className="link">
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</motion.nav>
			</AnimatePresence>
		</>
	);
}
