"use client";
import Nav from "@/components/Nav";
import ProjectCarousel from "@/components/ProjectCarousel";
import Skills from '@/components/Skills';
import Typing from "@/components/Typing";
import WorkContainer from "@/components/WorkContainer";
import Hero from "@/components/hero";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

import '@/css/Home.css';

const DynamicTracingBeam = dynamic(() => import('@/components/TracingBeams').then(mod => mod.TracingBeam));
const DynamicContact = dynamic(() => import('@/components/Contact'));

export default function Home() {
    return (
        <>
            <div className={"h-24"}>
                <Nav />
            </div>
            <main className="flex min-h-screen flex-col items-center justify-between home">
                <section
                    className="h-[150vh] bg-[var(--background-start-rgb)] w-full relative overflow-clip"
                >
                    <Hero
                        title={"Peterson Guo"}
                        description={<Typing />}
                    />
                </section>
                <section className="!mt-0 md:w-[50vw] px-5 flex flex-col space-y-5 pt-10" id="about">
                    <p>
                        {"Hi there! I'm Peterson Guo, an Electrical Engineer at the University of Waterloo. I focus on systems programming, embedded systems, and quantitative finance."}
                    </p>
                    <div>
                        <Link href="#contact" className="border-white border overflow-hidden rounded-2xl px-5 py-2 relative ease-in-out slide-fill hover:text-black">Contact Me</Link>
                    </div>
                </section>
                <section className="bg-[var(--secondary-bg)] justify-center rounded-2xl md:px-32 px-5 py-14 hidden md:flex">
                    <Skills />
                </section>
                <section className="w-full !mt-0 md:px-[10vw] px-5 flex flex-col space-y-5 py-10">
                    <h1 className='m-0 p-0 mx-auto text-center'>
                        Education
                    </h1>
                    <div className="flex flex-row items-center rounded-xl bg-[var(--secondary-bg)] p-4 space-x-5 md:w-[30vw] mx-auto justify-center">
                        <Image src="https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Waterloo_seal.svg" alt="University of Waterloo" width={80} height={80} className="inline-block" />
                        <div>
                            <h3 className='m-0 p-0'>
                                {"University of Waterloo"}
                            </h3>
                            <p className='m-0 p-0 text-sm text-gray-300'>
                                {"BASc. in Electrical Engineering, Honours"}
                            </p>
                            <p className="m-0 p-0 text-sm text-gray-300">
                                Sep. 2023 - Apr. 2028
                            </p>
                        </div>
                    </div>
                </section>
                <section className="w-full px-5">
                    <DynamicTracingBeam>
                        <div>
                            <h1>Work History</h1>
                        </div>
                        <WorkContainer />
                    </DynamicTracingBeam>
                </section>
                <section className={"w-full flex flex-col items-center"} id="projects">
                    <h1>
                        Projects
                    </h1>
                    <ProjectCarousel />
                </section>
                <section className="w-full mt-5 py-0 md:px-[20vw] px-5">
                    <DynamicContact />
                </section>
            </main>
        </>
    );
}
