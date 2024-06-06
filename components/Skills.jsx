"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// ssr this

import "@/css/Skills.css";

const skillsByCategory = {
	"Programming Languages": [
		{
			src: "C.png",
			alt: "C",
			href: "https://en.cppreference.com/w/c",
		},
		{
			src: "CPP.png",
			alt: "C++",
			href: "https://cplusplus.com/reference/",
		},
		{
			src: "CS.png",
			alt: "C#",
			href: "https://docs.microsoft.com/en-us/dotnet/csharp/",
		},
		{ src: "Java.webp", alt: "Java", href: "https://www.java.com/" },
		{
			src: "JS.png",
			alt: "JavaScript",
			href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
		},
		{ src: "Python.png", alt: "Python", href: "https://www.python.org/" },
		{
			src: "TS.png",
			alt: "TypeScript",
			href: "https://www.typescriptlang.org/",
		},
	],
	"Frontend Development": [
		{ src: "React.png", alt: "React", href: "https://reactjs.org/" },
		{ src: "Next.png", alt: "Next.js", href: "https://nextjs.org/" },
		{ src: "Vue3.png", alt: "Vue3", href: "https://v3.vuejs.org/" },
		{
			src: "CSS.png",
			alt: "CSS",
			href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
		},
		{
			src: "HTML.png",
			alt: "HTML",
			href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
		},
		{
			src: "Tailwind.png",
			alt: "Tailwind CSS",
			href: "https://tailwindcss.com/",
		},
		{
			src: "Bootstrap.png",
			alt: "Bootstrap",
			href: "https://getbootstrap.com/",
		},
	],
	"Backend Development": [
		{ src: "Nodejs.png", alt: "Node.js", href: "https://nodejs.org/" },
		{
			src: "FastAPI.png",
			alt: "FastAPI",
			href: "https://fastapi.tiangolo.com/",
		},
		{
			src: "Flask.png",
			alt: "Flask",
			href: "https://flask.palletsprojects.com/en/3.0.x/",
		},
	],
	"Cloud & DevOps": [
		{ src: "AWS.webp", alt: "AWS", href: "https://aws.amazon.com/" },
		{ src: "Docker.png", alt: "Docker", href: "https://www.docker.com/" },
		{
			src: "GoogleCloud.png",
			alt: "Google Cloud",
			href: "https://cloud.google.com/",
		},
		{ src: "TF.png", alt: "Terraform", href: "https://www.terraform.io/" },
	],
	"Mobile Development": [
		{
			src: "Android.png",
			alt: "Android",
			href: "https://www.android.com/",
		},
		{ src: "Flutter.png", alt: "Flutter", href: "https://flutter.dev/" },
	],
	"Databases & Storage": [
		{
			src: "Firebase.png",
			alt: "Firebase",
			href: "https://firebase.google.com/",
		},
		{
			src: "MongoDB.png",
			alt: "MongoDB",
			href: "https://www.mongodb.com/",
		},
		{
			src: "Postgres.png",
			alt: "PostgreSQL",
			href: "https://www.postgresql.org/",
		},
		{
			src: "Snowflake.png",
			alt: "Snowflake",
			href: "https://www.snowflake.com/",
		},
	],
	"Other Technologies": [
		{ src: "Arduino.png", alt: "Arduino", href: "https://www.arduino.cc/" },
		{
			src: "F360.png",
			alt: "Fusion360",
			href: "https://www.autodesk.com/products/fusion-360/overview",
		},
		{ src: "IFTTT.png", alt: "IFTTT", href: "https://ifttt.com/" },
		{ src: "Linux.png", alt: "Linux", href: "https://www.linux.org/" },
		{ src: "OpenCV.png", alt: "OpenCV", href: "https://opencv.org/" },
		{
			src: "STM.png",
			alt: "STM",
			href: "https://www.st.com/content/st_com/en.html",
		},
		{
			src: "Tensorflow.png",
			alt: "TensorFlow",
			href: "https://www.tensorflow.org/",
		},
	],
};

export default function Skills() {
	const [activeCategory, setActiveCategory] = useState(
		"Programming Languages"
	);

	const [activeTab, setActiveTab] = useState(null);

	useEffect(() => {
		setActiveTab(document.querySelector(".tab.active"));
	}, []);

	const setActive = (e) => {
		console.log(e);
		setActiveCategory(e.target.innerText);
		setActiveTab(e.target);
	};

	const [loadPriority, setLoadPriority] = useState(
		new Array(skillsByCategory[activeCategory].length)
			.fill(false)
			.fill(true, 0, 5)
	); // Load first 5 images with priority

	// Effect to update loadPriority once the page has loaded
	useEffect(() => {
		const handleLoad = () => {
			setLoadPriority(
				new Array(skillsByCategory[activeCategory].length).fill(true)
			); // Mark all images to be loaded with priority
		};

		window.addEventListener("load", handleLoad);

		// Cleanup
		return () => {
			window.removeEventListener("load", handleLoad);
		};
	}, [activeCategory]);

	return (
		<div>
			<h1>Skills & Tools</h1>
			<div className="tabs">
				{Object.keys(skillsByCategory).map((category) => (
					<button
						key={category}
						className={`tab ${
							activeCategory === category ? "active" : ""
						}`}
						onClick={setActive}
					>
						{category}
					</button>
				))}
				{activeTab && (
					<div
						className="selector"
						style={{
							left: activeTab.offsetLeft,
							width: activeTab.offsetWidth,
						}}
					/>
				)}
			</div>
			<div className="flex flex-wrap md:p-4 p-0 justify-center">
				{Object.keys(skillsByCategory).map((category) => (
					<div
						key={category}
						className={`logo-container flex ${
							activeCategory === category ? "" : "hidden"
						}`}
					>
						{skillsByCategory[category].map((skill, i) => (
							<div key={i} className="p-2">
								<Link
									href={skill.href}
									target="_blank"
									rel="noopener noreferrer"
									className="block hover:scale-110 transition-transform duration-200 ease-in-out"
								>
									<div className="flex items-center justify-center w-10 h-10 md:w-24 md:h-24 bg-gray-100 rounded-lg shadow hover:shadow-lg overflow-hidden">
										<Image
											src={`/logos/skills/${skill.src}`}
											alt={`${skill.alt} logo`}
											width={80}
											height={80}
											style={{ objectFit: "contain" }}
											priority={loadPriority[i]}
											placeholder="blur"
											blurDataURL={`/logos/skills/${skill.src}`}
											className="transition-opacity duration-200 ease-in-out"
										/>
									</div>
								</Link>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
