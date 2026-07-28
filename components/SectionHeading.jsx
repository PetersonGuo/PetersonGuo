import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";

/**
 * Shared centred heading for the page sections so they share one rhythm.
 * Pass `href` to make the title navigate somewhere.
 */
export default function SectionHeading({
	eyebrow,
	title,
	subtitle,
	href,
	className = "",
}) {
	const heading = (
		<h2 className="bg-gradient-to-br from-white via-white to-white/55 bg-clip-text text-3xl leading-tight text-transparent sm:text-4xl">
			{title}
		</h2>
	);

	return (
		<div className={`flex flex-col items-center text-center ${className}`}>
			{eyebrow && (
				<div className="mb-3 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300/80">
					<span className="h-px w-6 bg-blue-400/50" />
					{eyebrow}
					<span className="h-px w-6 bg-blue-400/50" />
				</div>
			)}

			{href ? (
				<Link
					href={href}
					className="group inline-flex items-center gap-2 transition-colors"
				>
					{heading}
					<TbArrowRight
						size={24}
						className="-translate-x-2 text-blue-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
					/>
				</Link>
			) : (
				heading
			)}

			{subtitle && (
				<p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-400">
					{subtitle}
				</p>
			)}
		</div>
	);
}
