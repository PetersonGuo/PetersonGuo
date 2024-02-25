import GoogleGeminiEffect from "@/components/ui/google-gemini-effect";
import Typing from "@/components/ui/Typing";
import { TracingBeam } from "@/components/ui/TracingBeams";
import Nav from "@/components/ui/Nav";
import WorkCard from "../components/ui/WorkCard";

export default function Home() {
    return (
        <>
            <div className={"h-24"}>
                <Nav />
            </div>
            <main className="flex min-h-screen flex-col items-center justify-between">
                <div
                    className="h-[400vh] bg-black w-full relative overflow-clip"
                >
                    <GoogleGeminiEffect
                        title={"Peterson Guo"}
                        description={<Typing />}
                    />
                </div>
                <TracingBeam className={"mt-[50vh] h-[100vh]"}>
                    <div>
                        <h1>Work History</h1>
                    </div>
                    <div className={"grid grid-cols-1"}>
                        <WorkCard title={"Security Developer"} company={"eSentire"} time={"January 2024 - Present"} />
                        <WorkCard title={"App Developer"} company={"BroadCast Fantasia"} />
                        <WorkCard title={"Simulation Developer"} company={"COBWEB"} />
                        <WorkCard title={"Robotics Developer"} company={"Trubotics"} />
                    </div>
                </TracingBeam>
                <div className={"h-screen"}>

                </div>
            </main>
        </>
    );
}
