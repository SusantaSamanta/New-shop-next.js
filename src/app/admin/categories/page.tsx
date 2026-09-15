"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import CategoryStats from "@/app/_components/admin/categories/CategoryStats"; 
import CategoryTable from "@/app/_components/admin/categories/CategoryTable"; 

// import CategoryStats from "@/_components/admin/category/CategoryStats";
// import CategoryTable from "@/components/admin/category/CategoryTable";
// import CategoryPagination from "@/components/admin/category/CategoryPagination";

export default function CategoriesPage() {
    return (
        <div className="space-y-4 md:space-y-4">

            {/* Header */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                        Categories
                    </h1>

                    <p className="text-muted-foreground">
                        Manage all product categories.
                    </p>
                </div>

                <Button asChild className="py-5">
                    <Link href="/admin/categories/add">
                        <Plus className=" h-4 w-4" />
                        Add Category
                    </Link>
                </Button>

            </div>

            {/* Statistics */}
            <CategoryStats />

 

            {/* Table */}
            <CategoryTable />



        </div>
    );
}