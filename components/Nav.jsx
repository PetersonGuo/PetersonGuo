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
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";

const navigation = [
	{ name: "About", href: "/#about", current: true },
	{ name: "Projects", href: "/#projects", current: false },
	{ name: "Contact", href: "/#contact", current: false },
];

const links = [
	{ name: "Resume", href: "/Peterson_Guo_Resume.pdf" },
	{ name: "GitHub", href: "https://github.com/PetersonGuo" },
	{ name: "LinkedIn", href: "https://www.linkedin.com/in/petersonguo/" },
];

export default function Nav() {
	const pathname = usePathname();
	const { scrollYProgress } = useScroll();
	const [open, setOpen] = useState(false);
	const [mobile, setMobile] = useState(null);
	const [visible, setVisible] = useState(true);
	const [hasScrolled, setHasScrolled] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		const updateMobile = () => setMobile(window.innerWidth < 768);
		updateMobile();
		window.addEventListener("resize", updateMobile);

		if (window.innerWidth >= 768) {
			const handleScroll = () => {
				if (window.scrollY > 50) {
					setHasScrolled(true);
				}
			};
			window.addEventListener("scroll", handleScroll);
			return () => {
				window.removeEventListener("scroll", handleScroll);
				window.removeEventListener("resize", updateMobile);
			};
		}

		return () => {
			window.removeEventListener("resize", updateMobile);
		};
	}, []);

	useMotionValueEvent(scrollYProgress, "change", (current) => {
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
						`z-[10] fixed text-center justify-center flex flex-col md:grid grid-cols-3 items-center w-full md:h-[5em] px-8 md:py-3 bg-black md:text-sm text-2xl transition-all duration-300 ease-in-out ${
							open ? "h-full" : mobile && "h-[13%] items-start"
						}`
					)}
				>
					{mobile && (
						<>
							{open ? (
								<HiXMark
									className="size-14 absolute left-[10%] active:rotate-180 transition-all ease-in-out"
									onClick={() => { setOpen(false) }}
								/>
							) : (
								<AnimatePresence>
									<motion.div
										initial={{ y: 0 }}
										animate={{ y: open ? 100 : 0 }}
										transition={{ duration: 0.2 }}
									>
										<HiBars3
											className="size-10 left-[10%]"
											onClick={() => setOpen(true)}
										/>
									</motion.div>
								</AnimatePresence>
							)}
						</>
					)}
					{(open || !mobile) && (
						<>
							<Link
								href="/"
								className="name justify-self-start invisible md:visible"
							>
								Peterson Guo
							</Link>
							<ul
								className={cn(
									"nav-links flex md:flex-row flex-col items-center md:justify-self-center md:space-x-4",
									{ show: isMounted }
								)}
							>
								{navigation.map((item) => (
									<li key={item.name}>
										<Link
											href={item.href}
											className={"link"}
											onClick={() => setOpen(false)}
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
							<ul
								className={cn(
									"nav-links flex md:flex-row flex-col items-center md:justify-self-end md:space-x-4 pt-4 md:pt-0",
									{ show: isMounted }
								)}
							>
								{links.map((item) => (
									<li key={item.name}>
										<Link
											href={item.href}
											target="_blank"
											className="link"
											onClick={() => setOpen(false)}
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</>
					)}
				</motion.nav>
			</AnimatePresence>
		</>
	);
}
