import Link from "next/link";
import React from "react";

export default function CategoryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className='w-full h-screen flex flex-col items-center'>
            <div className="w-full max-w-6xl h-screen  overflow-hidden relative md:pt-16">
               
                <header className="bg-background/70">Category : Fruits</header>
                <section className='w-full max-h-full flex justify-start border-2'>

                    <aside className={`w-20 lg:w-25  z-10 h-screen  p-4 flex flex-col border transition-all duration-300`}>
                        <div className="h-full flex flex-col justify-between border-0">
                            <nav className="flex flex-col gap-3 mt-15 lg:mt-20">
                                <Link href="/category/" className={`p-2 pl-0 rounded-md flex items-center gap-2 `}>All</Link>
                                <Link href="/category/fruits" className={`p-2 pl-0 rounded-md flex items-center gap-2 `}>Fruits</Link>
                                <Link href="/category/milk-dairy" className={`p-2 pl-0 rounded-md flex items-center gap-2 `}>Milk-Dairy</Link>
                                <Link href="/category/bakery" className={`p-2 pl-0 rounded-md flex items-center gap-2 `}>Bakery</Link>
                            </nav>


                        </div>
                    </aside>

                    {/* Page Content */}
                    <main className="flex-1 p-5 overflow-y-auto">
                        {children}
                    </main>

                </section>
            </div>
        </main>
    );
}