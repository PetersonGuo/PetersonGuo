import GoogleGeminiEffect from "@/components/ui/google-gemini-effect";
import Typing from "@/components/ui/Typing";
import {TracingBeam} from "@/components/ui/TracingBeams";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <div
            className="h-[300vh] bg-black w-full relative overflow-clip"
        >
            <GoogleGeminiEffect
                title={"I am Peterson Guo"}
                description={<Typing />}
            />
        </div>
        <TracingBeam className={"mt-[50vh]"}>
            <div className={"h-[100vh]"}>
                <h1>Projects</h1>
                <p>Some of the projects I have worked on</p>
            </div>
        </TracingBeam>
        <div className={"h-screen"}>

        </div>
    </main>
  );
}
