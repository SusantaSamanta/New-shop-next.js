"use client";
import Image from "next/image";
import mainLogo from "../../../assets/App logo4.png";
import {
    ChevronDown,
    LayoutGrid,
    Loader2,
    MapPin,
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
    const pathname = usePathname();

    return (
        <header className={`shadow-sm  ${pathname.includes('/category') ? "fixed -top-16" : "sticky top-0"} md:top-0 w-full z-50  bg-background/90 backdrop-blur-md border-b-[0.5px] transition-all duration-300`}>
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-1.5 md:py-2 flex items-center justify-between">
                {/* Left Side */}
                <div className="flex items-center gap-2 lg:gap-6">
                    <Link href={'/'} className="flex items-end gap-2">
                        <Image className={`min-w-20 max-w-25 md:w-40`}
                            src={mainLogo}
                            alt="logo"
                            priority
                        />
                        {/* <span className="text-xl md:text-2xl font-bold text-green-600">
                            FreshNext
                        </span> */}
                    </Link>

                    {status === "loading" ?
                        <div className="w-40 h-11 hidden md:block rounded-lg bg-gray-100 animate-pulse" />
                        :
                        <SetLocation userId={session?.user.id} />
                    }
                    <CategoryDropdown />



                    <div className="w-auto lg:w-80 mr-10 hidden md:flex items-center gap-2  rounded-lg px-2 py-2 border bg-gray-300/20">
                        <Search className="h-4 w-4 font-bold" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none w-full"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="hidden md:flex items-center gap-4 md:gap-6">

                    <ThemeChangeBtn />
                    <CartList />
                    <Link href={'/profile'}>
                        <UserCircle />
                    </Link>
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
                    <div className="flex ml-5 md:ml-10 md:hidden min-w-4 max-w-10 w-full items-center gap-2 border rounded-full px-2 py-1">
                        <Search className="h-5 w-5 text-muted-foreground" />
                        {/* <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none"
                            /> */}
                    </div>

                    {/* <ThemeChangeBtn /> */}



                    {status === "authenticated" ?
                        <Button onClick={() => {
                            signOut();
                            toast.success("Logout successful...");
                        }}
                        className="hidden sm:block"
                        >Logout</Button>
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
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LocationPicker from "./location/LocationPicker";
import { useApp } from "@/context/AppContext";
import { getUserDefaultAddress } from "@/services/addressService";


function CategoryDropdown() {
    return (
        <div className="hidden lg:block">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border  bg-gray-300/20 cursor-pointer">
                        <LayoutGrid className="h-5 w-5" />
                        <span className="flex items-center gap-2">
                            Category <ChevronDown
                                size={14}
                                strokeWidth={2.5}
                                className="mt-1 text-gray-500 transition-transform group-hover:translate-y-0.5"
                            />
                        </span>
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
                                            src={item.icon ?? "../../../assets/category icons/fruits.png"}
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



function SetLocation({ userId }: { userId: string | undefined }) {

    const { userDefaultAddress, setUserDefaultAddress } = useApp();
    // const { user } = useSession();
    const [locationOpen, setLocationOpen] = useState(false);
    const [fetchingLocation, setFetchingLocation] = useState(false);


    useEffect(() => {
        if (!userId) return;

        setFetchingLocation(true);
        async function get() {
            const data = await getUserDefaultAddress(userId);
            if (data.success) {
                setUserDefaultAddress(data?.address ?? null);
            } else {
                console.log("Failed to fetch user default location");
                setUserDefaultAddress(null);
            }
            setFetchingLocation(false)
        }
        get();
    }, [userId])




    return (
        <>
            <button
                onClick={() => setLocationOpen(true)}
                type="button"
                className="w-35 md:w-40 group flex items-center gap-1 rounded-lg px-1 py-1.5 text-left transition-colors hover:bg-green-200/10"
            >
                {/* Location Icon */}
                <MapPin
                    size={20}
                    strokeWidth={0.5}
                    className="shrink-0 text-emerald-600 fill-emerald-600 [&_circle]:fill-white "
                />

                {/* Location Text */}
                <div className="min-w-0">
                    <p className="text-[11px] leading-4 text-green-600 hidden md:block">
                        Delivered to
                    </p>

                    <div className="flex max-w-37.5 items-center gap-0.5">
                        {fetchingLocation ?
                            <p className="text-xs text-transparent w-25 rounded-lg bg-gray-100 animate-pulse">Load</p>
                            :
                            <p className="truncate text-xs font-semibold text-gray-900">
                                {/* Susanta, Durgapurssssdssssssssssss */}
                                {userDefaultAddress?.apiAddress? userDefaultAddress?.apiAddress : "Select location"}
                            </p>
                        }

                        {!fetchingLocation &&
                            <ChevronDown
                                size={14}
                                strokeWidth={2.5}
                                className="shrink-0 text-gray-500 transition-transform group-hover:translate-y-0.5"
                            />}
                    </div>
                </div>
            </button>
            <LocationPicker
                open={locationOpen}
                onOpenChange={setLocationOpen}
            />
        </>
    );
}


