"use client"
import CategorySideBar from "@/app/_components/CategorySideBar";
import { usePathname } from "next/navigation";
import React from "react";

export default function CategoryLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const pathname = usePathname();

    const category = pathname.split("/").pop()?.replace(/-/g, " ");

    return (
        <div className='w-full h-screen flex justify-center overflow-hidden items-center md:pt-16'>
            <div className="w-full max-w-6xl h-full flex flex-col ">

                <div className="w-full  border bg-background px-5 py-1 text-base font-semibold capitalize">
                    {category === "category" ? "All Products" : category}
                </div>
                <div className='w-full h-full flex overflow-hidden border'>

                    <CategorySideBar />


                    <main className="flex-1 pb-25 p-3 md:p-5 md:pb-20 bg-gray-50 dark:bg-background/80 overflow-y-auto">
                        {children}
                    </main>

                </div>
            </div>
        </div>
    );
}