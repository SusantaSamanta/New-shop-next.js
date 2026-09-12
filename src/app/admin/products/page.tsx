"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProductStats from "@/app/_components/admin/product/ProductStats";
import ProductFilters from "@/app/_components/admin/product/ProductFilters";
import ProductTable from "@/app/_components/admin/product/ProductTable";
import ProductPagination from "@/app/_components/admin/product/ProductPagination";

export default function ProductsPage() {
    return (
        <div className="space-y-4 md:space-y-4">
            {/* Header */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                        Products
                    </h1>

                    <p className="text-muted-foreground">
                        Manage all products available in your platform.
                    </p>
                </div>

                <Button asChild className="py-5">
                    <Link href="/admin/products/add">
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Link>
                </Button>
            </div>


            
            <ProductStats />

            {/* Search & Filters */}
            <ProductFilters />





            {/* Statistics Placeholder */}

            <ProductTable />

            <ProductPagination />



            {/* <div className="rounded-2xl border bg-background">
                <div className="border-b p-4">
                    <h2 className="text-lg font-semibold">
                        Product List
                    </h2>
                </div>

                <div className="flex h-80 items-center justify-center text-muted-foreground">
                    Product Table Component
                </div>
            </div>

            <div className="rounded-2xl border border-dashed bg-background p-6 text-center">
                Pagination Component
            </div> */}
        </div>
    );
}