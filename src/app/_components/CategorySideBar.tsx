"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "../../../assets/category icons/category images";
import { useEffect, useRef, useState } from "react";
import { collections } from "../../../assets/Collections categories";



const CategorySideBar = () => {
    const pathname = usePathname();
    const [isCollection, setIsCollection] = useState<boolean | null>();
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        console.log(pathname.includes('/collection'))
        setIsCollection(pathname.includes('/collection') ? true : false);

        let index = categories.findIndex(
            (item) => pathname === `/category/${item.value}`
        );
        index = collections.findIndex(
            (item) => pathname === `/category/collection/${item.value}`
        );
        if (index !== -1) {
            itemRefs.current[index]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [pathname]);

    return (
        <aside className="w-22 lg:w-28 h-full border-r bg-background overflow-y-auto">
            <nav className="flex flex-col items-center gap-3 py-4 p-2 ">

                {/* All */}
                <Link
                    href="/category"
                    className={`w-full flex flex-col items-center gap-2 rounded-xl p-2 transition-all 
            ${pathname === "/category"
                            ? "bg-green-100 text-green-600"
                            : "hover:bg-muted"
                        }`}
                >
                    <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl bg-white dark:bg-background text-xl font-bold">
                        All
                    </div>

                    <span className="text-xs text-center font-medium">
                        All
                    </span>
                </Link>

                {isCollection === false &&
                    <>
                        {/* Dynamic Categories */}
                        {categories.map((category, index) => (
                            <Link
                                key={category.value}
                                ref={(el) => { itemRefs.current[index] = el; }}
                                href={`/category/${category.value}`}
                                className={`w-full flex flex-col items-center gap-1 rounded-xl p-2 transition-all
                        ${pathname === `/category/${category.value}`
                                        ? "bg-green-100 text-green-600"
                                        : "hover:bg-muted"
                                    }`}
                            >
                                <Image
                                    src={category.icon}
                                    alt={category.label}
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-contain"
                                />

                                <span className="text-center text-xs font-medium leading-4">
                                    {category.label}
                                </span>
                            </Link>
                        ))}
                    </>
                }


                {/* collections Links */}
                {isCollection &&
                    <>
                        {/* Dynamic collections */}
                        {collections.map((collection,index) => (
                            <Link
                                key={collection.value}
                                ref={(el) => { itemRefs.current[index] = el; }}
                                href={`/category/collection/${collection.value}`}
                                className={`w-full flex flex-col items-center gap-2 rounded-xl p-2 transition-all
                        ${pathname === `/category/collection/${collection.value}`
                                        ? "bg-green-100 text-green-700"
                                        : "hover:bg-muted text-green-500"
                                    }`}
                            >
                                <collection.icon className="w-6 h-8 md:w-8 md:h-10 rounded-xl object-contain" />

                                <span className="text-center text-xs font-medium leading-4">
                                    {collection.label}
                                </span>
                            </Link>
                        ))}
                    </>
                }
            </nav>
            <div className="h-20 ">

            </div>
        </aside>
    );
};

export default CategorySideBar;