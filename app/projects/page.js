"use client";
import { ReactTerminal } from "react-terminal";
import Nav from '@/components/ui/Nav';
export default function Page() {
    return (
        <>
        <div className={"h-24"}>
            <Nav/>
        </div>
    <main>
            <ReactTerminal/>
        </main>
        </>
    )
}