"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// ssr this

import "@/css/Skills.css";

const skillsByCategory = {
  "Programming Languages": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png",
      alt: "C",
      href: "https://en.cppreference.com/w/c",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1067px-ISO_C%2B%2B_Logo.svg.png",
      alt: "C++",
      href: "https://cplusplus.com/reference/",
    },
    {
      src: "https://1000logos.net/wp-content/uploads/2020/08/Python-Logo.png",
      alt: "Python",
      href: "https://www.python.org/",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Logo_C_sharp.svg/1067px-Logo_C_sharp.svg.png",
      alt: "C#",
      href: "https://docs.microsoft.com/en-us/dotnet/csharp/",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/656px-Java_programming_language_logo.svg.png",
      alt: "Java",
      href: "https://www.java.com/",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      alt: "JavaScript",
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png",
      alt: "TypeScript",
      href: "https://www.typescriptlang.org/",
    },
  ],
  "Frameworks": [
	{
      src: "https://mlir.llvm.org//mlir-logo.png",
      alt: "MLIR",
      href: "https://mlir.llvm.org/",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
      alt: "Node.js",
      href: "https://nodejs.org/",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/FastAPI_logo.svg/1200px-FastAPI_logo.svg.png",
      alt: "FastAPI",
      href: "https://fastapi.tiangolo.com/",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg",
      alt: "Flask",
      href: "https://flask.palletsprojects.com/en/3.0.x/",
    },
  ],
  "Cloud & DevOps": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/640px-Amazon_Web_Services_Logo.svg.png",
      alt: "AWS",
      href: "https://aws.amazon.com/",
    },
    {
      src: "https://www.docker.com/app/uploads/2023/08/logo-guide-logos-1.svg",
      alt: "Docker",
      href: "https://www.docker.com/",
    },
    {
      src: "https://logos-world.net/wp-content/uploads/2021/02/Google-Cloud-Logo.png",
      alt: "Google Cloud",
      href: "https://cloud.google.com/",
    },
    {
      src: "https://www.svgrepo.com/show/354444/terraform.svg",
      alt: "Terraform",
      href: "https://www.terraform.io/",
    },
  ],
  "Databases & Storage": [
    {
      src: "https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png",
      alt: "Firebase",
      href: "https://firebase.google.com/",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png",
      alt: "MongoDB",
      href: "https://www.mongodb.com/",
    },
    {
      src: "https://1000logos.net/wp-content/uploads/2020/08/PostgreSQL-Logo.png",
      alt: "PostgreSQL",
      href: "https://www.postgresql.org/",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Snowflake_Logo.svg/1024px-Snowflake_Logo.svg.png",
      alt: "Snowflake",
      href: "https://www.snowflake.com/",
    },
  ],
  "Other Technologies": [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Pytorch_logo.png",
      alt: "PyTorch",
      href: "https://pytorch.org/",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/330px-Tux.svg.png",
      alt: "Linux",
      href: "https://www.linux.org/",
    },
    {
      src: "https://github.com/opencv/opencv/wiki/logo/OpenCV_logo_black.png",
      alt: "OpenCV",
      href: "https://opencv.org/",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/449px-Tensorflow_logo.svg.png",
      alt: "TensorFlow",
      href: "https://www.tensorflow.org/",
    },
  ],
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Programming Languages");

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
    <div className="w-[70vw]">
      <h1>Skills & Tools</h1>
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
                      placeholder="blur"
                      blurDataURL={`/logos/skills/${skill.src}`}
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
