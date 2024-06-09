import Contact from '@/components/Contact';
import Nav from "@/components/Nav";
import Skills from '@/components/Skills';
import { TracingBeam } from "@/components/TracingBeams";
import Typing from "@/components/Typing";
import WorkContainer from "@/components/WorkContainer";
import Hero from "@/components/hero";
import Link from 'next/link';

import '@/css/Home.css';

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
                <section className="!mt-0 md:px-[30vw] px-5 items-center flex flex-col space-y-5 pt-10" id="about">
                    <p>
                        {"Hi there! I'm currently diving deep into the world of electrical engineering at the University of Waterloo, where my passion for technology is being shaped into a promising career. My journey is fueled by an insatiable curiosity for innovation and a drive to make technology more user-friendly and accessible. Outside of school, I'm an avid snowboarder and fitness enthusiast, constantly seeking new challenges and experiences to broaden my horizons."}
                    </p>
                    <p>
                        {"My academic endeavors at Waterloo are just one part of my story. I'm also deeply passionate about applying what I learn in real-world scenarios. My goal is to merge my technical expertise with my entrepreneurial spirit to create solutions that truly make a difference."}
                    </p>

                    <p>
                        {"If my journey resonates with you, whether you're curious about my passions or considering a collaborative project, I'd love to connect. Reach out to learn more about my experiences or discuss potential opportunities together."}
                    </p>
                    <Link href="#contact" className="border-white border overflow-hidden rounded-2xl px-5 py-2 relative ease-in-out slide-fill hover:text-black">Contact Me</Link>
                </section>
                <section className="bg-[var(--secondary-bg)] justify-center rounded-2xl md:px-32 px-5 py-14 hidden md:flex">
                    <Skills />
                </section>
                <section className="w-full px-5">
                    <TracingBeam>
                        <div>
                            <h1>Work History</h1>
                        </div>
                        <WorkContainer />
                    </TracingBeam>
                </section>
                <section className={""}>
                    <h1>
                        Projects
                    </h1>
                    <p className="text-center">
                        Coming Soon
                    </p>
                </section>
                <section className="w-full mt-5 !py-0 md:!px-[20vw] px-5">
                    <Contact />
                </section>
            </main>
        </>
    );
}
