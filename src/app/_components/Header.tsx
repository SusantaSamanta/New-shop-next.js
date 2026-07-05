"use client";
import Image from "next/image";
import mainLogo from "../../../assets/App logo2.png";
import {
    LayoutGrid,
    Loader2,
    Search,
    UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CartList from "./CartList";
import ThemeChangeBtn from "./ThemeChangeBtn";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

const Header = () => {

    const { data: session, status } = useSession();
    console.log(session?.user, status);


    return (
        <header className={`border-b shadow-sm fixed top-0 w-full z-50  dark:bg-[#000000b9] bg-[#ffffffb3] backdrop-blur-sm`}>
            <section className="max-w-7xl mx-auto px-4 py-1 md:py-2 flex items-center justify-between">
                {/* Left Side */}
                <div className="flex items-center gap-4 md:gap-8">
                    <Link href={'/'}>
                        <Image className={`w-13 md:w-15 `}
                            src={mainLogo}
                            alt="logo"
                            priority
                        />
                    </Link>

                    <div className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 dark:bg-gray-700 cursor-pointer">
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
                <div className="hidden md:flex items-center gap-4 md:gap-6">

                    <ThemeChangeBtn />
                    <CartList />
                    <UserCircle />
                    {status === "loading" &&
                        <Loader2 className="animate-spin" />
                    }
                    {status === "authenticated" &&
                        <Button onClick={() => {
                            signOut();
                            toast.success("Logout successful...");
                        }}>Logout</Button>
                    }
                    {status === "unauthenticated" &&
                        <Button><Link href={"/sign-in"}>Login</Link></Button>
                    }


                </div>



                <div className="w-full flex md:hidden items-center justify-end gap-2 md:gap-6 border-0">
                    <div className="flex ml-10 md:hidden min-w-4 max-w-10 w-full items-center gap-2 border rounded-full px-2 py-1">
                        <Search className="h-5 w-5 text-muted-foreground" />
                        {/* <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none"
                            /> */}
                    </div>

                    <ThemeChangeBtn />



                    {status === "authenticated" ?
                        <Button onClick={() => {
                            signOut();
                            toast.success("Logout successful...");
                        }}>Logout</Button>
                        :
                        <Button><Link href={"/sign-in"}>Login</Link></Button>
                    }
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


