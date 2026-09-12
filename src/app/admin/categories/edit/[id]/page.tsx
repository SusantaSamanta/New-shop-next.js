'use client'

import CategoryForm from "@/app/_components/admin/categories/CategoryForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddCategoryPage() {
    return (
        <div className="space-y-4 pb-4">

            {/* Header */}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <Button
                            asChild
                            variant="outline"
                            size="icon"
                        >
                            <Link href="/admin/categories">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>

                        <div>
                            <h1 className="text-xl md:text-2xl font-bold">
                                Edit Category
                            </h1>

                            <p className="text-muted-foreground">
                                Edit the product category details.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <CategoryForm />

        </div>
    );
}