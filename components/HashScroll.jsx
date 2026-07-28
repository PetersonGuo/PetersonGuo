"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fixes two anchor-navigation problems:
 *
 * 1. Arriving at /#section from another page lands short. The browser scrolls
 *    while the document is still growing (web fonts, dynamically imported
 *    sections, images), so the target moves down afterwards and you end up
 *    above it. We re-scroll until the target's offset stops changing.
 *
 * 2. Clicking a link to the section you are already on does nothing: the hash
 *    is unchanged, so no navigation or scroll event fires. We intercept those
 *    clicks and scroll manually.
 */
export default function HashScroll() {
	const pathname = usePathname();

	useEffect(() => {
		const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
		if (!id) return;

		let cancelled = false;
		let attempts = 0;
		let lastTop = null;
		let stableFor = 0;
		let timer;

		const stop = () => {
			cancelled = true;
			clearTimeout(timer);
			window.removeEventListener("wheel", stop);
			window.removeEventListener("touchstart", stop);
		};

		// If the visitor starts scrolling, stop correcting under them.
		window.addEventListener("wheel", stop, { passive: true });
		window.addEventListener("touchstart", stop, { passive: true });

		const tick = () => {
			if (cancelled) return;
			const el = document.getElementById(id);

			if (el) {
				const top = el.getBoundingClientRect().top + window.scrollY;
				stableFor = lastTop !== null && Math.abs(top - lastTop) < 1 ? stableFor + 1 : 0;
				lastTop = top;

				// "auto" rather than "smooth": these are corrections, and a
				// smooth scroll would be restarted by the next tick.
				el.scrollIntoView({ behavior: "auto", block: "start" });

				// Settled for three consecutive checks; nothing left to correct.
				if (stableFor >= 3) return stop();
			}

			if (++attempts < 20) timer = setTimeout(tick, 80);
			else stop();
		};

		timer = setTimeout(tick, 0);
		return stop;
	}, [pathname]);

	useEffect(() => {
		const onClick = (e) => {
			if (e.defaultPrevented || e.button !== 0) return;
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

			const anchor = e.target.closest?.("a[href]");
			if (!anchor || anchor.target === "_blank") return;

			let url;
			try {
				url = new URL(anchor.href, window.location.href);
			} catch {
				return;
			}

			// Only same-page hash links; let the router handle everything else.
			if (!url.hash || url.pathname !== window.location.pathname) return;

			const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
			if (!el) return;

			e.preventDefault();
			history.replaceState(null, "", url.hash);
			el.scrollIntoView({ behavior: "smooth", block: "start" });
		};

		document.addEventListener("click", onClick);
		return () => document.removeEventListener("click", onClick);
	}, []);

	return null;
}
