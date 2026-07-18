"use client";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import ThemeChangeBtn from "../ThemeChangeBtn";

const AdminHeader = () => {
  const pathname = usePathname();
  const page =
    pathname === "/admin"
      ? "Dashboard"
      : pathname.split("/").pop()?.replace("-", " ");

  return (
    <header className="px-2 sticky top-0 z-50 flex  h-12 md:h-16 items-center justify-between border-b bg-background ">

      {/* Left */}
      <div className="flex items-center gap-2">

        <SidebarTrigger />

        <div>
          <h2 className="text-lg font-semibold capitalize">
            {page}
          </h2>

          <p className="text-sm text-muted-foreground hidden md:block">
            Welcome back 👋
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="relative hidden md:block">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search..."
            className="w-72 pl-10"
          />

        </div>

        {/* Theme */}
        <ThemeChangeBtn/>

        {/* Notification */}
        <Button
          variant="outline"
          size="icon"
        >
          <Bell className="h-5 w-5" />
        </Button>

        {/* Profile */}
        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <Avatar className="cursor-pointer">

              <AvatarImage src="https://www.trillertv.com/thumbs/o/profile/40791_300x300.jpg" />

              <AvatarFallback>
                VR
              </AvatarFallback>

            </Avatar>

          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-52"
          >

            <DropdownMenuItem>
              My Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-500">
              Logout
            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </header>
  );
};

export default AdminHeader;