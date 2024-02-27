import Nav from '@/components/ui/Nav';
import Contact from '@/components/ui/Contact';

export default function Page() {
    return (
        <>
            <div className={"h-24"}>
                <Nav />
            </div>
            <main className="">
                <section className='flex justify-center items-center w-full px-[20vw] !m-0 !py-0'>
                    <Contact />
                </section>
            </main>
        </>
    )
}