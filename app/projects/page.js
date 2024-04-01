"use client";
import { ReactTerminal } from "react-terminal";
import Nav from '@/components/ui/Nav';

export default function Page() {
    return (
        <>
            <div className={"h-24"}>
                <Nav />
            </div>
            <main className={"py-10 px-20 h-60 w-full text-center"}>
                {/* <ReactTerminal/> */}
                <p>Coming Soon...</p>
            </main>
        </>
    )
}