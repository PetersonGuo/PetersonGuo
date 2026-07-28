"use client";
import { useEffect, useRef, useState } from "react";
import "@/css/Project.css";
import { Splide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";
import ProjectData from "@/components/ProjectData";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const splideRef = useRef(null);

  useEffect(() => {
    let timer;
    if (hoveredIndex !== null) {
      timer = setTimeout(() => {
        setFlippedIndex(hoveredIndex);
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [hoveredIndex]);

  // Splide's built-in `wheel` option swallows vertical wheel events too, which
  // stops the page scrolling when the cursor is over the carousel. Handle the
  // wheel manually so only horizontal intent (trackpad swipe, shift+wheel)
  // moves the carousel.
  useEffect(() => {
    const splide = splideRef.current?.splide;
    const track = splide?.Components?.Elements?.track;
    if (!splide || !track) return;

    let cooldown = false;
    const onWheel = (e) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!horizontal || Math.abs(e.deltaX) < 8) return;
      e.preventDefault();
      if (cooldown) return;
      cooldown = true;
      splide.go(e.deltaX > 0 ? ">" : "<");
      setTimeout(() => {
        cooldown = false;
      }, 220);
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="my-12 w-full project-carousel">
      <Splide
        ref={splideRef}
        className="px-3 py-4 sm:p-5"
        options={{
          type: "loop",
          drag: "free",
          snap: true,
          focus: "center",
          arrows: true,
          pagination: false,
          perPage: 3,
          gap: "1.5rem",
          // See the wheel handler above.
          wheel: false,
          autoScroll: {
            rewind: false,
            speed: 0.75,
            // Cards flip on hover, so the row must hold still while reading one,
            // and must not fight a manual drag.
            pauseOnHover: true,
            pauseOnFocus: true,
          },
          breakpoints: {
            1280: { perPage: 2 },
            // One card below 768px: two on a narrow tablet leaves each too
            // small to read.
            768: { perPage: 1, gap: "1rem" },
          },
        }}
        extensions={{ AutoScroll }}
      >
        {ProjectData.map((project, i) => (
          <ProjectCard
            key={`Project${i}`}
            project={project}
            index={i}
            setHoveredIndex={setHoveredIndex}
            setFlippedIndex={setFlippedIndex}
            flippedIndex={flippedIndex}
            isSlide={true}
          />
        ))}
      </Splide>
    </div>
  );
}
