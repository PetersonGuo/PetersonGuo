import Hero from "@/components/ui/hero";
import Typing from "@/components/ui/Typing";
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
        time: "January 2024 - Present",
        description: [
            "Accomplished significant improvements in data management through the development of a recursive function for JSON - to - database conversion.This enhanced the processing capabilities for complex data types.",
            "Automated FastAPI deployment to AWS through the creation of a Terraform template, using endpoint logging and SQS queue data processing.This standardized deployment across 8 projects, facilitating a smoother and more efficient development workflow.",
            "Achieved a 400 % increase in processing speed for the Incident Report function through the implementation of Python list comprehension, using optimized algorithms to enhance efficiency in data retrieval and storage.",
            "Led the design and implementation of a Vue3 component for a threat dashboard through the integration of MDR insights and automated PDF report generation, using Vue.js and PDF generation technologies.This improved client engagement and intelligence delivery significantly.",
            "Contributed to the development of proprietary software for emerging threat detection, underlining my expertise in handling projects with high confidentiality and complexity."]
    },
    {
        title: "Full Stack Developer",
        company: "Broadcast Fantasia",
        time: "05/2023 – 09/2023",
        description: [
            "Enhanced e-commerce functionality and user experience through the development of custom Shopify apps, using Shopify’s API and web development best practices.This led to a 4 % increase in customer engagement metrics.",
            "Ensured optimal functionality, robust security, and high performance of Shopify apps through comprehensive testing and debugging, using automated testing tools. This resulted in a 99.5 % uptime and a 5 % reduction in customer - reported issues.",
            "Expanded app features and capabilities through integrations with over 5 third - party APIs, using RESTful API standards. This contributed to a 15 % increase in app functionality and user satisfaction."]
    },
    {
        title: "Simulation Developer",
        company: "COBWEB",
        time: "06/2023 – 09/2023",
        description: ["Developed and enhanced simulation models for health-related research through software engineering applications in scientific contexts, using C++ and Java.This optimized code resulted in a 15 % reduction in memory usage and a 10% increase in speed."]
    },
    {
        title: "Robotics Developer",
        company: "Trubotics",
        time: "05/2022 – 06/2023",
        description: ["Designed mechanical components for optimization through the application of Fusion360, using principles of mechanical design and software engineering.This demonstrated a blend of skills for optimal performance.", "Engineered competitive autonomous strategies through the development of C++ algorithms, using sensor technologies. This catapulted the competition ranking from 135th to 31st, showcasing expertise in sensor integration and algorithm development."]
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
                    className="h-[400vh] bg-black w-full relative overflow-clip"
                >
                    <Hero
                        title={"Peterson Guo"}
                        description={<Typing />}
                    />
                </section>
                <section className="!mt-0 px-20">
                    <p>I&apos;m an Electrical Engineering graduate from the University of Waterloo, specializing in Artificial Intelligence. My passion for technology drives my continuous exploration of programming languages and frameworks. With experience in security, full-stack development, and robotics, I have contributed to diverse projects, showcasing my ability to innovate and solve complex problems. My academic and practical experiences have equipped me with a strong foundation to contribute effectively to technology-driven environments. My goal is to leverage my skills to develop innovative solutions that address real-world challenges.</p>
                </section>
                <section className="bg-[#0f0f0f] w-full flex justify-center py-20">
                    <Skills />
                </section>
                <section className="w-full">
                    <TracingBeam className={"h-[100vh]"}>
                        <div>
                            <h1>Work History</h1>
                        </div>
                        <div className={"grid"}>
                            {
                                WorkData.map((data, i) => {
                                    return <WorkCard title={data.title} company={data.company} time={data.time} description={data.description} key={`WorkCard${i}`} />;
                                })
                            }
                        </div>
                    </TracingBeam>
                </section>
                <section className={"h-screen"}>
                    <h1>
                        Projects
                    </h1>
                </section>
                <section className="w-full !py-0 !px-[20vw] h-screen !mb-0">
                    <Contact />
                </section>
            </main>
        </>
    );
}
