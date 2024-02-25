import Nav from "@/components/ui/Nav";

export default function Page() {
    return (
        <>
            <div className={"h-24"}>
                <Nav/>
            </div>
            <div className={"items-center w-screen text-center"}>
                <h1 className={"text-6xl font-bold"}>
                    About Me
                </h1>
                <div>
                    I am a passionate Software Developer.
                </div>
            </div>
        </>
    )
}