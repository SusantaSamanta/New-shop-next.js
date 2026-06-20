"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import mainLogo from "../../../public/mainLogo.svg";

import {
    LayoutGrid,
    Search,
    ShoppingBag,
    Moon,
    Sun,
    Menu,
    X,
    Home,
    MapPinPen,
    CircleUser,
} from "lucide-react";


import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Header = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <header className="border-b shadow-sm">
            <section className="max-w-7xl mx-auto px-4 py-2 md:py-3 flex items-center justify-between">

                {/* Left Side */}
                <div className="flex items-center gap-4 md:gap-8">
                    <Image className="w-8 h-8 md:w-10 md:h-10"
                        src={mainLogo}
                        alt="logo"
                        width={40}
                        height={40}
                        priority
                    />

                    <div className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 dark:bg-slate-800 cursor-pointer">
                        <LayoutGrid className="h-5 w-5" />
                        <span>Category</span>
                    </div>

                    <div className="hidden lg:flex items-center gap-2 border rounded-full px-4 py-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="hidden lg:flex items-center gap-4 md:gap-6 ">
                    {/* Theme Toggle */}
                    <div className="flex items-center gap-2">
                        <Switch
                            className="cursor-pointer"
                            checked={theme === "dark"}
                            onCheckedChange={(checked) =>
                                setTheme(checked ? "dark" : "light")
                            }
                        />
                        {
                            theme === "dark" ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4" />
                        }
                    </div>

                    {/* Cart */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <ShoppingBag className="h-5 w-5" />
                        <span>0</span>
                    </div>

                    {/* Login Button */}
                    <Button>Login</Button>
                </div>

            </section>


            {/* mobile nav */}
            <section className=" w-full absolute bottom-0 lg:hidden">
                <div className="w-full px-4 py-2 flex items-center justify-between gap-3 ">
                    <Home />
                    <LayoutGrid />
                    <CircleUser />
                    <ShoppingBag className="h-6 w-6" />
                </div>
            </section>


        </header>
    );
};

export default Header;



// <Search className="h-5 w-5 cursor-pointer" />

//                     <Button size="sm">Login</Button>

//                     <Sheet open={open} onOpenChange={setOpen}>
//                         <SheetTrigger asChild>
//                             <button className="cursor-pointer">
//                                 {open ? (
//                                     <X className="h-1 w-1" />
//                                 ) : (
//                                     <Menu className="h-6 w-6" />
//                                 )}
//                             </button>
//                         </SheetTrigger>

//                         <SheetContent side="right">
//                             <SheetHeader className="border-0">
//                                 <SheetTitle>Menu</SheetTitle>
//                             </SheetHeader>

//                             <div className="pl-4 flex flex-col gap-6 border-0">


//                                 <div className="flex items-center gap-3 cursor-pointer">
//                                     <LayoutGrid className="h-5 w-5" />
//                                     <span>Category</span>
//                                 </div>


//                                 <div className="flex items-center gap-3 cursor-pointer">
//                                     <ShoppingBag className="h-5 w-5" />
//                                     <span>Cart (0)</span>
//                                 </div>


//                                 <div className="flex items-center justify-between">

//                                     <div className="flex items-center gap-2">
//                                         <Switch
//                                             className="cursor-pointer"
//                                             checked={theme === "dark"}
//                                             onCheckedChange={(checked) =>
//                                                 setTheme(checked ? "dark" : "light")
//                                             }
//                                         />
//                                         {
//                                             theme === "dark" ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4" />
//                                         }
//                                     </div>
//                                 </div>
//                             </div>
//                         </SheetContent>
//                     </Sheet>


