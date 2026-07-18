import React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";
import AdminSidebar from "../_components/admin/AdminSidebar";
import AdminHeader from "../_components/admin/AdminHeader";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AdminSidebar />

            <SidebarInset>
                <AdminHeader />
                <main className="p-2 md:p-4">
                    {children}
                </main>

                <div>Footer</div>
            </SidebarInset>
        </SidebarProvider>
    );
}

