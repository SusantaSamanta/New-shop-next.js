"use client"
import React from "react";

import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";
import AdminSidebar from "../_components/admin/AdminSidebar";
import AdminHeader from "../_components/admin/AdminHeader";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "../_components/common/Loader";


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    const { data: session, status } = useSession();
    if (status === "loading") {
        return (
            <Loader />
        );
    }



    if (!session) {
        redirect("/sign-in");
    }

    if (session.user.role !== 'ADMIN') {
        redirect("/");
    }


    return (
        <SidebarProvider>
            <AdminSidebar />

            <SidebarInset>
                <AdminHeader />

                <main className="w-full overflow-hidden">
                    <div className="mx-auto w-full max-w-7xl p-2 md:p-4">
                        {children}
                    </div>
                </main>

                <div className="h-10 border-t flex items-center justify-center">
                    Footer
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

