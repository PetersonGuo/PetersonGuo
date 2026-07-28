"use client";
import { useEffect, useState } from "react";
import { TbArrowsDiagonal } from "react-icons/tb";

/**
 * Panel chrome for the demo widgets, with working traffic-light controls:
 * close, minimise (collapse to the title bar) and maximise (fullscreen).
 *
 * Children are never unmounted -- only hidden -- because the terminal and the
 * WebGL canvas hold live state (an xterm instance, a running JVM, a Three.js
 * renderer) that would be destroyed by a remount.
 */
export default function WindowFrame({ title, hint, height = 320, children }) {
	const [state, setState] = useState("normal"); // normal | minimized | maximized | closed

	const maximized = state === "maximized";
	const minimized = state === "minimized";
	const closed = state === "closed";

	// Escape leaves fullscreen, and the page must not scroll behind it.
	useEffect(() => {
		if (!maximized) return;
		const onKey = (e) => e.key === "Escape" && setState("normal");
		window.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [maximized]);

	const dot = (color, label, onClick) => (
		<button
			type="button"
			onClick={onClick}
			aria-label={label}
			title={label}
			className={`h-3 w-3 rounded-full ${color} opacity-80 transition-opacity hover:opacity-100`}
		/>
	);

	return (
		<>
			{/* Placeholder shown once the panel is closed. */}
			{closed && (
				<div className="mt-4 flex items-center justify-center rounded-lg border border-dashed border-gray-700 py-8">
					<button
						type="button"
						onClick={() => setState("normal")}
						className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
					>
						<TbArrowsDiagonal size={15} />
						Reopen {title}
					</button>
				</div>
			)}

			<div
				className={
					maximized
						? "fixed inset-0 z-50 flex flex-col gap-3 bg-black/95 p-4 sm:p-8"
						: `mt-4 ${closed ? "hidden" : ""}`
				}
			>
				{/* Title bar */}
				<div className="flex items-center gap-3">
					<div className="flex gap-1.5">
						{dot("bg-red-500", `Close ${title}`, () => setState("closed"))}
						{dot("bg-yellow-400", minimized ? `Expand ${title}` : `Minimise ${title}`, () =>
							setState(minimized ? "normal" : "minimized")
						)}
						{dot("bg-green-500", maximized ? `Exit fullscreen` : `Maximise ${title}`, () =>
							setState(maximized ? "normal" : "maximized")
						)}
					</div>
					<span className="font-mono text-xs text-gray-400">{title}</span>
					{hint && <span className="font-mono text-xs text-gray-600">{hint}</span>}
					{maximized && (
						<span className="ml-auto font-mono text-xs text-gray-600">
							esc to exit
						</span>
					)}
				</div>

				{/* Body: hidden rather than unmounted so live state survives. */}
				<div
					className={
						maximized
							? "flex min-h-0 flex-1 flex-col"
							: minimized
							? "hidden"
							: ""
					}
					style={maximized ? undefined : { minHeight: minimized ? 0 : undefined }}
				>
					{typeof children === "function"
						? children({ maximized, height: maximized ? "100%" : height })
						: children}
				</div>
			</div>
		</>
	);
}
