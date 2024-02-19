import {Inter} from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/Nav";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Peterson Guo",
    description: "Portfolio of Peterson Guo",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">

        <body className={inter.className}>
        <Nav/>
        {children}
        </body>
        </html>
    );
}
