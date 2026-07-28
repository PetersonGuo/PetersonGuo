"use client";
import "@/css/Nav.css";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { TbFileText } from "react-icons/tb";

const sections = [
	{ name: "About", href: "/#about", id: "about" },
	{ name: "Projects", href: "/#projects", id: "projects" },
	{ name: "Contact", href: "/#contact", id: "contact" },
];

const socials = [
	{ name: "GitHub", href: "https://github.com/PetersonGuo", Icon: FaGithub },
	{ name: "LinkedIn", href: "https://www.linkedin.com/in/petersonguo/", Icon: FaLinkedin },
];

const RESUME = "/Peterson_Guo_Resume.pdf";

export default function Nav() {
	const pathname = usePathname();
	const { scrollY } = useScroll();

	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [hidden, setHidden] = useState(false);
	const [active, setActive] = useState(null);

	useMotionValueEvent(scrollY, "change", (y) => {
		const previous = scrollY.getPrevious() ?? 0;
		setScrolled(y > 8);
		// Never retract the bar while the mobile menu is open.
		if (open) return;
		setHidden(y > 140 && y > previous);
	});

	// Close the menu on navigation.
	useEffect(() => setOpen(false), [pathname]);

	// Lock body scroll behind the mobile menu.
	useEffect(() => {
		if (!open) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previous;
		};
	}, [open]);

	// Highlight whichever section is in view. Sections mount at different times
	// (Contact is a dynamic import), so keep looking until they all exist.
	useEffect(() => {
		if (pathname !== "/") {
			setActive(null);
			return;
		}

		let observer;
		let attempts = 0;
		let timer;

		const attach = () => {
			const els = sections
				.map((s) => document.getElementById(s.id))
				.filter(Boolean);

			if (els.length) {
				observer?.disconnect();
				observer = new IntersectionObserver(
					(entries) => {
						const top = entries
							.filter((e) => e.isIntersecting)
							.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
						if (top) setActive(top.target.id);
					},
					// Only count a section once it reaches the middle band of the
					// viewport, so the highlight matches what you are reading.
					{ rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.5, 1] }
				);
				els.forEach((el) => observer.observe(el));
			}

			if (els.length < sections.length && ++attempts < 10) {
				timer = setTimeout(attach, 300);
			}
		};

		attach();
		return () => {
			clearTimeout(timer);
			observer?.disconnect();
		};
	}, [pathname]);

	const isActive = (s) => pathname === "/" && active === s.id;

	return (
		<motion.header
			initial={{ y: 0, opacity: 1 }}
			animate={{ y: hidden ? -110 : 0, opacity: hidden ? 0 : 1 }}
			transition={{ duration: 0.25, ease: "easeInOut" }}
			className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
				scrolled || open
					? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
					: "border-b border-transparent bg-transparent"
			}`}
		>
			{/* Equal 1fr outer tracks so the links sit on the true centre of the
			    page. justify-between would offset them, because the wordmark and
			    the action cluster are different widths. */}
			<nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 sm:px-8 md:grid md:grid-cols-[1fr_auto_1fr]">
				<Link
					href="/"
					className="nav-name text-base font-medium text-white md:justify-self-start"
				>
					Peterson Guo
				</Link>

				{/* Desktop links */}
				<ul className="hidden items-center gap-8 md:flex md:justify-self-center">
					{sections.map((s) => (
						<li key={s.name}>
							<Link
								href={s.href}
								className="nav-link"
								data-active={isActive(s)}
								aria-current={isActive(s) ? "page" : undefined}
							>
								{s.name}
							</Link>
						</li>
					))}
				</ul>

				{/* Desktop actions: the box fills the right 1fr track and its
				    children are pushed to the far edge. */}
				<div className="hidden items-center gap-2 md:flex md:w-full md:justify-end">
					{socials.map(({ name, href, Icon }) => (
						<a
							key={name}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={name}
							className="flex h-9 w-9 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white"
						>
							<Icon size={17} />
						</a>
					))}
					<a
						href={RESUME}
						target="_blank"
						rel="noopener noreferrer"
						className="ml-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white/85 transition-colors hover:border-white/35 hover:bg-white/10 hover:text-white"
					>
						<TbFileText size={15} />
						Résumé
					</a>
				</div>

				{/* Mobile toggle */}
				<button
					type="button"
					onClick={() => setOpen((v) => !v)}
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
				>
					{open ? <HiXMark size={24} /> : <HiBars3 size={24} />}
				</button>
			</nav>

			{/* Mobile menu */}
			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						key="mobile-menu"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: "easeInOut" }}
						className="overflow-hidden md:hidden"
					>
						<div className="space-y-1 border-t border-white/10 px-6 pb-6 pt-4">
							{sections.map((s) => (
								<Link
									key={s.name}
									href={s.href}
									onClick={() => setOpen(false)}
									className={`block rounded-lg px-3 py-3 text-lg transition-colors ${
										isActive(s)
											? "bg-white/10 text-white"
											: "text-white/75 hover:bg-white/5 hover:text-white"
									}`}
								>
									{s.name}
								</Link>
							))}

							<a
								href={RESUME}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setOpen(false)}
								className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-base text-white/85"
							>
								<TbFileText size={16} />
								Résumé
							</a>

							<div className="flex items-center justify-center gap-3 pt-4">
								{socials.map(({ name, href, Icon }) => (
									<a
										key={name}
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={name}
										className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80"
									>
										<Icon size={19} />
									</a>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
}
