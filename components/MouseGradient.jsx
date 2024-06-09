"use client";
import { useEffect, useState } from "react";

const MouseGradient = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e) => {
		setPosition({ x: e.clientX, y: e.clientY });
	};

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	if (typeof window !== 'undefined' && window.screen.width < 768) return null;

	return (
		<div
			style={{
				zIndex: 100,
				position: "fixed",
				left: position.x,
				top: position.y,
				width: "100px",
				height: "100px",
				borderRadius: "100%",
				background:
					"radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 80%)",
				pointerEvents: "none",
				transform: "translate(-50%, -50%)",
				mixBlendMode: "lighten",
				transition: "opacity 0.2s", // Smooth transition for the gradient appearance
				opacity: 0.6,
			}}
		/>
	);
};

export default MouseGradient;
