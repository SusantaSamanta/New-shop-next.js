'use client'

import ProductForm from "@/app/_components/admin/product/ProductForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProductPage() {
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
                            <Link href="/admin/products">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>

                        <div>
                            <h1 className="text-xl md:text-2xl font-bold">
                                Edit Product
                            </h1>

                            <p className="text-muted-foreground">
                                Edit the product details.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ProductForm />

        </div>
    );
}