"use client";
import Nav from "@/components/Nav";
import ProjectCarousel from "@/components/ProjectCarousel";
import SectionHeading from "@/components/SectionHeading";
import Skills from "@/components/Skills";
import Typing from "@/components/Typing";
import WorkContainer from "@/components/WorkContainer";
import Hero from "@/components/hero";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { TbArrowRight, TbFileText, TbMail } from "react-icons/tb";

import "@/css/Home.css";

const DynamicTracingBeam = dynamic(() =>
    import("@/components/TracingBeams").then((mod) => mod.TracingBeam)
);
const DynamicContact = dynamic(() => import("@/components/Contact"));

// One container width for every section so their left edges line up.
const container = "mx-auto w-full max-w-5xl px-6 sm:px-8";
const pill =
    "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors";

export default function Home() {
    return (
        <>
            <div className={"h-24"}>
                <Nav />
            </div>

            <main className="home flex min-h-screen flex-col">
                <section className="relative h-[150vh] w-full overflow-clip bg-[var(--background-start-rgb)]">
                    <Hero title={"Peterson Guo"} description={<Typing />} />
                </section>

                {/* About */}
                <section id="about" className={`${container} py-20`}>
                    <SectionHeading eyebrow="About" title="A bit about me" className="mb-8" />
                    <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-gray-300">
                        {"Hi there! I'm Peterson Guo, studying Mathematics at the University of Waterloo. I focus on systems programming, embedded systems, and quantitative finance."}
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link
                            href="#contact"
                            className={`${pill} border-blue-400/40 bg-blue-500/15 text-blue-100 hover:border-blue-300/70 hover:bg-blue-500/25`}
                        >
                            <TbMail size={16} />
                            Get in touch
                        </Link>
                        <Link
                            href="/projects"
                            className={`${pill} group border-white/20 bg-white/5 text-white/85 hover:border-white/35 hover:bg-white/10 hover:text-white`}
                        >
                            View projects
                            <TbArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-0.5"
                            />
                        </Link>
                        <a
                            href="/Peterson_Guo_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${pill} border-white/20 bg-white/5 text-white/85 hover:border-white/35 hover:bg-white/10 hover:text-white`}
                        >
                            <TbFileText size={16} />
                            Résumé
                        </a>
                    </div>
                </section>

                {/* Skills */}
                <section className={`${container} hidden py-20 md:block`}>
                    <SectionHeading eyebrow="Toolkit" title="Skills & tools" className="mb-8" />
                    <div className="rounded-3xl border border-white/10 bg-[var(--secondary-bg)] px-8 py-10">
                        <Skills />
                    </div>
                </section>

                {/* Education */}
                <section className={`${container} py-20`}>
                    <SectionHeading eyebrow="Education" title="Where I study" className="mb-8" />
                    <div className="mx-auto flex max-w-xl flex-row items-center justify-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20">
                        <Image
                            src="/logos/uwaterloo.svg"
                            alt="University of Waterloo"
                            width={72}
                            height={72}
                            className="shrink-0"
                        />
                        <div>
                            <h3 className="m-0 p-0 text-xl">University of Waterloo</h3>
                            <p className="m-0 p-0 text-sm text-gray-400">
                                BMath in Honours Mathematics
                            </p>
                            <p className="m-0 p-0 font-mono text-xs text-gray-500">
                                Sep. 2023 &ndash; Apr. 2028
                            </p>
                            <p className="m-0 mt-2 p-0 text-sm text-gray-500">
                                Transferred from Electrical Engineering
                            </p>
                        </div>
                    </div>
                </section>

                {/* Work */}
                <section className={`${container} py-20`}>
                    <DynamicTracingBeam>
                        <SectionHeading
                            eyebrow="Experience"
                            title="Work history"
                            className="mb-10"
                        />
                        <WorkContainer />
                    </DynamicTracingBeam>
                </section>

                {/* Projects -- heading aligns to the container, carousel runs full width */}
                <section id="projects" className="w-full py-20">
                    <div className={container}>
                        <SectionHeading
                            eyebrow="Work"
                            title="Projects"
                            href="/projects"
                            subtitle="A few things I've built. Some of them run right in your browser."
                        />
                    </div>
                    <ProjectCarousel />
                </section>

                {/* Contact -- the id lives on the Contact component itself */}
                <section className={`${container} pb-24`}>
                    <DynamicContact />
                </section>
            </main>
        </>
    );
}
