"use client";
import { useState, useEffect } from "react";
import "@/css/Project.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";
import { TbExternalLink } from "react-icons/tb";
import ProjectData from "@/components/ProjectData";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [flippedIndex, setFlippedIndex] = useState(null);

  useEffect(() => {
    let timer;
    if (hoveredIndex !== null) {
      timer = setTimeout(() => {
        setFlippedIndex(hoveredIndex);
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [hoveredIndex]);

  return (
    <div className="my-12 w-full">
      <Splide
        className="p-5"
        options={{
          type: "loop",
          drag: "free",
          focus: "center",
          arrows: false,
          pagination: false,
          perPage: 3,
          gap: "1.5rem",
          autoScroll: {
            rewind: false,
            speed: 0.75,
          },
        }}
        extensions={{ AutoScroll }}
      >
        {ProjectData.map((project, i) => (
          <ProjectCard key={`Project${i}`} project={project} index={i} setHoveredIndex={setHoveredIndex} setFlippedIndex={setFlippedIndex} flippedIndex={flippedIndex} isSlide={true} />
        ))}
      </Splide>
    </div>
  );
}
