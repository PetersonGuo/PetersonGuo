"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TesseractViewer() {
	const canvasRef = useRef(null);
	const radiusRef = useRef(5);
	const phiRef = useRef(0);
	const thetaRef = useRef(Math.PI / 2);
	const initialRef = useRef({
		beta: null,
		phi: null,
		theta: null,
		radius: null,
	});
	const smoothedRadius = useRef(1);

	useEffect(() => {
		if (!canvasRef.current) return;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
		renderer.setSize(window.innerWidth, window.innerHeight);

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

		function rotateTesseractFromGyro(alpha, beta, gamma) {
			// On first call, capture initial pose
			if (initialRef.current.beta === null) {
				initialRef.current.beta   = beta;
				initialRef.current.phi    = phiRef.current;
				initialRef.current.theta  = thetaRef.current;
				initialRef.current.radius = radiusRef.current;
				smoothedRadius.current    = radiusRef.current;
				return;
			}

			// Compute signed tilt delta from start
			const delta = beta - initialRef.current.beta;
			const maxTilt = 60; // degrees of tilt

			// Normalize to [-1, +1]
			const normalized = Math.max(-1, Math.min(1, delta / maxTilt));

			// Define bounds
			const minR = 0.5;
			const maxR = 2.0;
			const baseR = initialRef.current.radius;

			// Map normalized to radius:
			//    normalized > 0 to forward tilt to zoom in (radius decrease toward minR)
			//    normalized < 0 to backward tilt to zoom out (radius increase toward maxR)
			let targetRadius;
			if (normalized >= 0) {
				// interpolate from baseR → minR
				targetRadius = baseR - normalized * (baseR - minR);
			} else {
				// interpolate from baseR → maxR
				targetRadius = baseR + (-normalized) * (maxR - baseR);
			}

			// Smooth it
			const smoothing = 0.1;
			smoothedRadius.current += (targetRadius - smoothedRadius.current) * smoothing;

			// Update camera angles & radius
			phiRef.current   = (gamma / 90) * 2 * Math.PI;
			thetaRef.current = (beta  / 60) * Math.PI;
			radiusRef.current = smoothedRadius.current;
		}

		function handleOrientation(event) {
			const { alpha, beta, gamma } = event;
			rotateTesseractFromGyro(alpha, beta, gamma);
		}

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

		function isMobile() {
			return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
		}

		function handleFirstTouch() {
			if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
				DeviceMotionEvent.requestPermission()
				.then(response => {
					if (response === 'granted') {
						window.addEventListener('deviceorientation', handleOrientation);
					} else {
						console.warn("Permission denied, falling back to mousemove");
						window.addEventListener('mousemove', handleMouseMove);
						window.addEventListener("wheel", handleWheel, { passive: true });
					}
				})
				.catch(err => {
					console.error("DeviceMotionEvent error:", err);
					window.addEventListener('mousemove', handleMouseMove);
					window.addEventListener("wheel", handleWheel, { passive: true });
				});
			} else {
				// Android or older browsers
				window.addEventListener('deviceorientation', handleOrientation);
			}
			window.removeEventListener('touchend', handleFirstTouch);
		}

		if (isMobile()) {
			window.addEventListener('touchend', handleFirstTouch);
		} else {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener("wheel", handleWheel, { passive: true });
		}

		return () => {
			renderer.setAnimationLoop(null);
			renderer.dispose();
			window.removeEventListener("wheel", handleWheel);
			window.removeEventListener('touchend', handleFirstTouch);
			window.removeEventListener('deviceorientation', handleMouseMove);
			window.removeEventListener("mousemove", handleMouseMove);
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
