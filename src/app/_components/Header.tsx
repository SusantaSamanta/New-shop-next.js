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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {

    const { data: session, status } = useSession();
    // console.log(session?.user, status);
    const pathname = usePathname();


    return (
        <header className={`border-y shadow-sm fixed ${pathname.includes('/category')? "-top-11" : "top-0"} md:top-0 w-full z-50  bg-background/50 dark:bg-background/70 backdrop-blur-md border-[0.5px] border-white/20  transition-all duration-300`}>
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

                    {/* <div className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 dark:bg-gray-700 cursor-pointer">
                        <LayoutGrid className="h-5 w-5" />
                        <span>Category</span>
                    </div> */}

                    <CategoryDropdown />



                    <div className="hidden lg:flex items-center gap-2 border rounded-full px-4 py-2 bg-background/20">
                        <Search className="h-4 w-4 text-muted-foreground " />
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



import { categories } from "../../../assets/category icons/category images";
import { useParams, usePathname } from "next/navigation";


function CategoryDropdown() {
    return (
        <div className="hidden md:block">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-[#bae2ff4d] border dark:bg-gray-700 cursor-pointer">
                        <LayoutGrid className="h-5 w-5" />
                        <span>Category</span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-50">
                    <DropdownMenuLabel>Select Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        categories.map((item) => {
                            return (
                                <Link href={`/category/${item.value}`} key={item.value}>
                                    <DropdownMenuItem
                                        className="h-8 flex my"

                                    >
                                        <Image
                                            src={item.icon?? "../../../assets/category icons/fruits.png"}
                                            alt="icon"
                                            width={27}
                                            height={27}
                                        />
                                        {item.label}
                                    </DropdownMenuItem>
                                </Link>
                            )
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

