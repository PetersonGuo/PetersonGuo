import MouseGradient from "@/components/MouseGradient";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Peterson Guo",
    description: "Portfolio of Peterson Guo",
};

export default function RootLayout({ children }) {

    return (
        <html lang="en" style={{ scrollBehavior: 'smooth' }}>
            <body className={inter.className}>
                <MouseGradient />
                {children}
            </body>
        </html>
    );
}
