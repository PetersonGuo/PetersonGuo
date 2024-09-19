"use client";
import Nav from '@/components/Nav';
import ProjectCard from '@/components/ProjectCard';
import ProjectData from '@/components/ProjectData';
import { useEffect, useState } from 'react';

export default function Page() {
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
        <>
            <div className={"h-24"}>
                <Nav />
            </div>
            <main className={"py-10 px-20 w-full text-center"}>
                {/* <ReactTerminal/> */}
                <h1 className={"text-4xl font-bold"}>Projects</h1>
                <div className={"w-full grid grid-cols-3 space-y-10"}>
                    {ProjectData.map((project, i) => (
                        <ProjectCard key={`Project${i}`} project={project} index={i} setFlippedIndex={setFlippedIndex} setHoveredIndex={setHoveredIndex} flippedIndex={flippedIndex} />
                    ))}
                </div>
            </main>
        </>
    )
}