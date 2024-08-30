"use client";
import { useState, useEffect } from "react";
import "@/css/Project.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";
import { TbExternalLink } from "react-icons/tb";

const ProjectData = [
  {
    name: "InvestIQ",
    description:
      "A stock analysis tool that provides real-time data and insights to help users make informed investment decisions.",
    link: "https://github.com/PetersonGuo/InvestIQ",
  },
  {
    name: "Bionic Evo",
    description:
      "A prosthetic limb that uses AI to optimize movement and provide a more natural user experience.",
    link: "https://github.com/PetersonGuo/BionicEvo",
  },
  {
    name: "Sentiview",
    description:
      "A sentiment analysis tool that uses machine learning to analyze social media data and provide insights to businesses.",
    link: "https://github.com/PetersonGuo/SentiView",
  },
  {
    name: "Assisted Reader",
    description:
      "A reading tool that uses AI to help users read more efficiently and retain information better.",
    link: "https://github.com/PetersonGuo/AssistedReader",
  },
  {
    name: "MindBridge",
    description:
      "A mental health app that uses AI to provide personalized support and resources to users.",
    link: "https://github.com/mindbridge-study/MindBridge",
  },
  {
    name: "TicTacToe AI",
    description:
      "A TicTacToe game that uses AI to provide a challenging opponent for players.",
    link: "https://github.com/PetersonGuo/TicTacToe",
  },
];

export default function ProjectCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [flippedIndex, setFlippedIndex] = useState(null);

  useEffect(() => {
    let timer;
    if (hoveredIndex !== null) {
      timer = setTimeout(() => {
        setFlippedIndex(hoveredIndex);
      }, 500);
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
          <SplideSlide
            key={`Project${i}`}
            className="box flex-none transition-all duration-300 ease-in-out"
            style={{ scrollSnapAlign: "start" }}
            onMouseEnter={(e) => {
              setHoveredIndex(i);
            }}
            onMouseLeave={(e) => {
              setHoveredIndex(null);
              setFlippedIndex(null);
            }}
          >
            {flippedIndex === i ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="content text-nowrap"
              >
                <h2 className="flex flex-row items-center text-nowrap z-2">
                  View Project <TbExternalLink className="ms-3" />
                </h2>
              </a>
            ) : (
              <div className="content text-nowrap">
                <h2>{project.name}</h2>
              </div>
            )}
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
