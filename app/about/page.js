import Nav from "@/components/ui/Nav";

export default function Page() {
    return (
        <>
            <div className={"h-24"}>
                <Nav/>
            </div>
            <main className={"items-center w-screen text-center"}>
                <h1 className={"text-6xl font-bold"}>
                    About Me
                </h1>
                <div>
                    I&apos;m an Electrical Engineering graduate from the University of Waterloo, specializing in Artificial Intelligence. My passion for technology drives my continuous exploration of programming languages and frameworks. With experience in security, full-stack development, and robotics, I have contributed to diverse projects, showcasing my ability to innovate and solve complex problems. My academic and practical experiences have equipped me with a strong foundation to contribute effectively to technology-driven environments. My goal is to leverage my skills to develop innovative solutions that address real-world challenges.
                </div>
            </main>
        </>
    )
}