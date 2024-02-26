import GoogleGeminiEffect from "@/components/ui/google-gemini-effect";
import Typing from "@/components/ui/Typing";
import { TracingBeam } from "@/components/ui/TracingBeams";
import Nav from "@/components/ui/Nav";
import WorkCard from "@/components/ui/WorkCard";
import Skills from '@/components/ui/Skills'

const WorkData = [
    {
        title: "Security Developer",
        company: "eSentire",
        time: "January 2024 - Present",
        description: []
    },
    {
        title: "App Developer",
        company: "Broadcast Fantasia",
        time: "",
        description: []
    },
    {
        title: "Simulation Developer",
        company: "COBWEB",
        time: "",
        description: []
    },
    {
        title: "Robotics Developer",
        company: "Trubotics",
        time: "",
        description: []
    }
];

export default function Home() {
    return (
        <>
            <div className={"h-24"}>
                <Nav />
            </div>
            <main className="flex min-h-screen flex-col items-center justify-between">
                <section
                    className="h-[400vh] bg-black w-full relative overflow-clip"
                >
                    <GoogleGeminiEffect
                        title={"Peterson Guo"}
                        description={<Typing />}
                    />
                </section>
                <section className="mt-[50vh]">
                    About Me
                    <Skills />
                </section>
                <section className="w-full">
                    <TracingBeam className={"mt-[50vh] h-[100vh]"}>
                        <div>
                            <h1>Work History</h1>
                        </div>
                        <div className={"grid"}>
                            {
                                WorkData.map((data, i) => {
                                    return <WorkCard title={data.title} company={data.company} time={data.time} key={`WorkCard${i}`} />;
                                })
                            }
                        </div>
                    </TracingBeam>
                </section>
                <section className={"h-screen"}>
                        Projects
                </section>
                <section>
                    Get in Touch
                </section>
            </main>
        </>
    );
}
