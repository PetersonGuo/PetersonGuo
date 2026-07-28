"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// ssr this

import "@/css/Skills.css";

// Drawn from the resume's skills section (C/C++, Python, MLIR, Bash, LLVM,
// CUDA, ROCm, PyTorch, Git, Linux) plus the stacks used across the projects in
// ProjectData.
//
// Logos are served from public/logos/skills rather than hotlinked: Wikimedia
// rate-limits hotlinked requests (429), which made logos fail intermittently.
// Run `npm run fetch-logos` to (re)download them.
const skillsByCategory = {
  "Languages": [
    {
      src: "/logos/skills/c.png",
      alt: "C",
      href: "https://en.cppreference.com/w/c",
    },
    {
      src: "/logos/skills/cpp.svg",
      alt: "C++",
      href: "https://cplusplus.com/reference/",
    },
    {
      src: "/logos/skills/python.png",
      alt: "Python",
      href: "https://www.python.org/",
    },
    {
      src: "/logos/skills/bash.svg",
      alt: "Bash",
      href: "https://www.gnu.org/software/bash/",
    },
    {
      src: "/logos/skills/java.svg",
      alt: "Java",
      href: "https://www.java.com/",
    },
    {
      src: "/logos/skills/typescript.svg",
      alt: "TypeScript",
      href: "https://www.typescriptlang.org/",
    },
    {
      src: "/logos/skills/javascript.png",
      alt: "JavaScript",
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
  ],
  "GPU & Compilers": [
    {
      src: "/logos/skills/cuda.jpg",
      alt: "CUDA",
      href: "https://developer.nvidia.com/cuda-toolkit",
    },
    {
      src: "/logos/skills/rocm.png",
      alt: "ROCm",
      href: "https://rocm.docs.amd.com/",
    },
    {
      src: "/logos/skills/llvm.png",
      alt: "LLVM",
      href: "https://llvm.org/",
    },
    {
      src: "/logos/skills/mlir.svg",
      alt: "MLIR",
      href: "https://mlir.llvm.org/",
    },
  ],
  "ML & AI": [
    {
      src: "/logos/skills/pytorch.png",
      alt: "PyTorch",
      href: "https://pytorch.org/",
    },
    {
      src: "/logos/skills/tensorflow.svg",
      alt: "TensorFlow",
      href: "https://www.tensorflow.org/",
    },
    {
      src: "/logos/skills/opencv.png",
      alt: "OpenCV",
      href: "https://opencv.org/",
    },
  ],
  "Web & Backend": [
    {
      src: "/logos/skills/react.svg",
      alt: "React",
      href: "https://react.dev/",
    },
    {
      src: "/logos/skills/nextjs.svg",
      alt: "Next.js",
      href: "https://nextjs.org/",
    },
    {
      src: "/logos/skills/nodejs.svg",
      alt: "Node.js",
      href: "https://nodejs.org/",
    },
    {
      src: "/logos/skills/fastapi.svg",
      alt: "FastAPI",
      href: "https://fastapi.tiangolo.com/",
    },
    {
      src: "/logos/skills/flask.svg",
      alt: "Flask",
      href: "https://flask.palletsprojects.com/",
    },
    {
      src: "/logos/skills/selenium.png",
      alt: "Selenium",
      href: "https://www.selenium.dev/",
    },
  ],
  "Systems & Data": [
    {
      src: "/logos/skills/linux.jpg",
      alt: "Linux",
      href: "https://www.kernel.org/",
    },
    {
      src: "/logos/skills/git.svg",
      alt: "Git",
      href: "https://git-scm.com/",
    },
    {
      src: "/logos/skills/docker.svg",
      alt: "Docker",
      href: "https://www.docker.com/",
    },
    {
      src: "/logos/skills/arduino.svg",
      alt: "Arduino",
      href: "https://www.arduino.cc/",
    },
    {
      src: "/logos/skills/postgresql.png",
      alt: "PostgreSQL",
      href: "https://www.postgresql.org/",
    },
    {
      src: "/logos/skills/mongodb.svg",
      alt: "MongoDB",
      href: "https://www.mongodb.com/",
    },
    {
      src: "/logos/skills/firebase.png",
      alt: "Firebase",
      href: "https://firebase.google.com/",
    },
  ],
};

const CATEGORIES = Object.keys(skillsByCategory);

export default function Skills() {
  // Derived from the data so renaming a category cannot leave this dangling.
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    setActiveTab(document.querySelector(".tab.active"));
  }, []);

  const setActive = (e) => {
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
    <div className="w-full">
      <div className="tabs justify-center">
        {Object.keys(skillsByCategory).map((category) => (
          <button
            key={category}
            className={`tab ${activeCategory === category ? "active" : ""}`}
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
                  <div className="flex items-center justify-center w-10 h-10 md:w-24 md:h-24 bg-white rounded-lg shadow hover:shadow-lg overflow-hidden">
                    <Image
                      src={skill.src}
                      alt={`${skill.alt} logo`}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                      priority={loadPriority[i]}
                      className="transition-opacity duration-200 ease-in-out w-[80%] h-[80%]"
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
