import Hero from "@/components/ui/hero";
import Typing from "@/components/ui/Typing";
import Link from 'next/link';
import { TracingBeam } from "@/components/ui/TracingBeams";
import Nav from "@/components/ui/Nav";
import WorkCard from "@/components/ui/WorkCard";
import Skills from '@/components/ui/Skills';
import Contact from '@/components/ui/Contact';

import '@/css/Home.css';

const WorkData = [
    {
        title: "Security Developer",
        company: "eSentire",
        image: "/esentire.png",
        time: "January 2024 - Present",
        description: [
            "Directed the development of a key threat analytics dashboard, which has become a cornerstone project, significantly boosting client engagement through enhanced data visualization and automated reporting. The dashboard’s success has catalyzed a strategic shift towards advanced analytics solutions, making it a major topic of discussion among company executives and a pivotal part of our operational transformation.",
            "Enhanced data management efficiencies by developing a JSON-to-database conversion function, significantly improving the handling and processing of complex data structures.",
            "Led the automation of deployment processes across four major projects, enhancing efficiency by 10% through the strategic use of Terraform templates.",
            "Dramatically increased the efficiency of incident reporting functions by over 400%, enhancing data processing and storage capabilities through optimized algorithms.",
            "Enhanced the logging and security protocols for multiple projects, standardizing methods to ensure robust access control and system monitoring.",
            "Developed and contributed to an open-source PCAP scrubber project, enhancing tool capabilities by implementing features that remove sensitive information, thus facilitating safe and effective training for network analysts."
        ]
    },
    {
        title: "Simulation Developer",
        company: "COBWEB",
        image: "/cobweb.png",
        time: "06/2023 – 09/2023",
        description: [
            "Developed and maintained simulation models such as particle physics, computer vision, and spring-mass systems.",
            "Developed and optimized health-related research simulation models using C++ and Java, achieving a 15% reduction in memory usage and a 10 % increase in processing speed."
        ]
    },
    {
        title: "Robotics Developer",
        company: "Trubotics",
        image: "/trubotics.png",
        time: "05/2022 – 06/2023",
        description: ["Designed mechanical components using Fusion360, incorporating principles of mechanical design and software engineering. This demonstrated a blend of skills for optimal performance.", "Engineered competitive autonomous strategies through the development of C++ algorithms, using sensor technologies. This catapulted the competition ranking from 135th to 31st, showcasing expertise in sensor integration and algorithm development."]
    }
];

export default function Home() {
    return (
        <>
            <div className={"h-24"}>
                <Nav />
            </div>
            <main className="flex min-h-screen flex-col items-center justify-between home">
                <section
                    className="h-[400vh] bg-[var(--background-start-rgb)] w-full relative overflow-clip"
                >
                    <Hero
                        title={"Peterson Guo"}
                        description={<Typing />}
                    />
                </section>
                <section className="!mt-0 px-[30vw] items-center flex flex-col space-y-5 pt-10" id="about">
                    <p>
                        {"Hi there! I'm currently diving deep into the world of electrical engineering at the University of Waterloo, where my passion for technology is being shaped into a promising career. My journey is fueled by an insatiable curiosity for innovation and a drive to make technology more user-friendly and accessible. Outside the lab, I'm an avid snowboarder and fitness enthusiast, constantly seeking new challenges and experiences to broaden my horizons."}
                    </p>
                    <p>
                        {"My academic endeavors at Waterloo are just one part of my story. I'm also deeply passionate about applying what I learn in real-world scenarios, which is why I'm eagerly looking for fall 2024 internships. My goal is to merge my technical expertise with my entrepreneurial spirit to create solutions that truly make a difference."}
                    </p>

                    <p>
                        {"If my journey resonates with you, whether you're curious about my passions or considering a collaborative project, I'd love to connect. Reach out to learn more about my experiences or discuss potential opportunities together."}
                    </p>
                    <Link href="#contact" className="border-white border overflow-hidden rounded-2xl px-5 py-2 relative ease-in-out slide-fill hover:text-black">Contact Me</Link>
                </section>
                <section className="bg-[var(--secondary-bg)] flex justify-center rounded-2xl md:px-32 py-14">
                    <Skills />
                </section>
                <section className="w-full">
                    <TracingBeam>
                        <div>
                            <h1>Work History</h1>
                        </div>
                        <div className={"md:grid"}>
                            {
                                WorkData.map((data, i) => {
                                    return <WorkCard title={data.title} image={data.image} company={data.company} time={data.time} description={data.description} key={`WorkCard${i}`} />;
                                })
                            }
                        </div>
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
                <section className="w-full !py-0 !px-[20vw]">
                    <Contact />
                </section>
            </main>
        </>
    );
}
