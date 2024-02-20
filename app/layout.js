import {Inter} from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import MouseGradient from "@/components/ui/MouseGradient";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Peterson Guo",
    description: "Portfolio of Peterson Guo",
};

export default function RootLayout({children}) {

    return (
        <html lang="en">
        <body className={inter.className}>
        <MouseGradient/>
        <div className={"h-20"}>
            <Nav/>
        </div>
        {children}
        </body>
        </html>
    );
}
