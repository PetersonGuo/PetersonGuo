"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TesseractViewer() {
	const canvasRef = useRef(null);
	const radiusRef = useRef(5);
	const phiRef = useRef(0);
	const thetaRef = useRef(Math.PI / 2);

	useEffect(() => {
		if (!canvasRef.current) return;

		// ─ build scene, camera, renderer ─
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
		renderer.setSize(window.innerWidth, window.innerHeight);

		// ─ create your tesseract edges ─
		const material = new THREE.LineBasicMaterial({ color: "#bfbfbf" });
		const cubeVerts = [
			[-1, -1, -1],
			[1, -1, -1],
			[1, 1, -1],
			[-1, 1, -1],
			[-1, -1, 1],
			[1, -1, 1],
			[1, 1, 1],
			[-1, 1, 1],
		];
		const innerVerts = cubeVerts.map((v) => v.map((x) => x * 0.5));
		function createEdges(verts) {
			const g = new THREE.Group();
			for (let i = 0; i < verts.length; i++) {
				for (let j = i + 1; j < verts.length; j++) {
					const d = verts[i].reduce(
						(a, x, k) => a + (x - verts[j][k]) ** 2,
						0
					);
					if (d === 1 || d === 4) {
						const geom = new THREE.BufferGeometry().setFromPoints([
							new THREE.Vector3(...verts[i]),
							new THREE.Vector3(...verts[j]),
						]);
						g.add(new THREE.Line(geom, material));
					}
				}
			}
			return g;
		}
		scene.add(createEdges(cubeVerts), createEdges(innerVerts));
		cubeVerts.forEach((v, i) => {
			const geom = new THREE.BufferGeometry().setFromPoints([
				new THREE.Vector3(...v),
				new THREE.Vector3(...innerVerts[i]),
			]);
			scene.add(new THREE.Line(geom, material));
		});

		// ─ animation loop: always re-read refs ─
		renderer.setAnimationLoop(() => {
			const r = radiusRef.current;
			const φ = phiRef.current;
			const θ = thetaRef.current;
			camera.position.set(
				r * Math.sin(θ) * Math.cos(φ),
				r * Math.cos(θ),
				r * Math.sin(θ) * Math.sin(φ)
			);
			camera.lookAt(0, 0, 0);
			renderer.render(scene, camera);
		});

		// ─ handlers just update refs ─
		const handleMouseMove = (e) => {
			phiRef.current = (e.clientX / window.innerWidth) * Math.PI * 2;
			thetaRef.current = (e.clientY / window.innerHeight) * Math.PI;
		};
		const handleWheel = (e) => {
			// zoom in/out
			radiusRef.current = Math.max(
				1,
				Math.min(10, radiusRef.current - e.deltaY * 0.02)
			);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("wheel", handleWheel, { passive: true });

		return () => {
			renderer.setAnimationLoop(null);
			renderer.dispose();
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("wheel", handleWheel);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "absolute",
				top: "-160%",
				left: 0,
				width: "100vw",
				height: "100vh",
				zIndex: -1,
				pointerEvents: "none",
			}}
		/>
	);
}
