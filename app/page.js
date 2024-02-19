import GoogleGeminiEffect from "@/components/ui/google-gemini-effect";
import Typing from "@/components/ui/Typing";

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
        hi
    </main>
  );
}
