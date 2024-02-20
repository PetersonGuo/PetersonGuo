import {Inter} from "next/font/google";
import "./globals.css";
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
        {children}
        </body>
        </html>
    );
}
