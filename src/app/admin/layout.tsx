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

