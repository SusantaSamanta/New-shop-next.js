"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Pencil, Package } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Product = {
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    categories: string[];
    subcategories: string[];
    mrp: number;
    sellingPrice: number;
    tax: number;
    weight: string;
    unit: string;
    shelfLife: string;
    country: string;
    numberOfTimesBuy: number;
    totalSold: number;
    totalRevenue: number;
    averageRating: number;
    numberOfReviews: number;
    thumbnail: string;
    galleryImages: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

export default function ProductDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isInvalidProduct, setIsInvalidProduct] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/admin/product/${id}`);
                setProduct(response.data?.product ?? null);
            } catch (error) {
                const err = error as { response?: { status?: number; data?: { message?: string } } };
                if (err.response?.status === 404) {
                    setIsInvalidProduct(true);
                } else {
                    toast.error(err.response?.data?.message || "Failed to load product.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (isInvalidProduct) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-background p-10 text-center">
                <p className="text-lg font-semibold text-foreground">
                    Invalid Product ID
                </p>
                <p className="text-sm text-muted-foreground">
                    No product found with the given id. Please check the URL.
                </p>

                <Button asChild variant="outline" className="mt-2">
                    <Link href="/admin/products">
                        Back to Products
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}

            <div className="flex flex-wrap items-center justify-between gap-4">
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
                            {product?.name ?? "Product Details"}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            View product information.
                        </p>
                    </div>
                </div>

                {product && (
                    <Button asChild className="py-5">
                        <Link href={`/admin/products/edit/${product.id}`}>
                            <Pencil className="h-4 w-4" />
                            Edit Product
                        </Link>
                    </Button>
                )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Images */}

                <div className="grid grid-cols-4 gap-4 rounded-2xl border p-3 md:p-4 md:block">
                    {/* Main Image */}
                    <div className="col-span-3">
                        {isLoading ? (
                            <Skeleton className="h-7/8 w-full rounded-xl" />
                        ) : product?.thumbnail ? (
                            <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="h-7/8 w-full rounded-xl object-cover"
                            />
                        ) : (
                            <div className="flex h-7/8 w-full items-center justify-center rounded-xl bg-muted">
                                <Package className="h-12 w-12 text-muted-foreground" />
                            </div>
                        )}
                    </div>

                    {/* Gallery */}
                    <div className="col-span-1 flex flex-col gap-3 md:mt-4 md:grid md:grid-cols-4">
                        {isLoading
                            ? [1, 2, 3, 4].map((item) => (
                                <Skeleton key={item} className="aspect-square w-full rounded-lg" />
                            ))
                            : product?.galleryImages?.length
                                ? product.galleryImages.map((image, index) => (
                                    <img
                                        key={`${image}-${index}`}
                                        src={image}
                                        alt={`${product.name} gallery`}
                                        className="aspect-square w-full rounded-lg object-cover"
                                    />
                                ))
                                : [1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="flex aspect-square w-full items-center justify-center rounded-lg bg-muted"
                                    >
                                        <Package className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                ))}
                    </div>
                </div>

                {/* Details */}

                <div className="md:col-span-2 space-y-4">

                    <div className="rounded-2xl border bg-background p-4">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-2xl font-bold">
                                {isLoading ? <Skeleton className="h-8 w-56" /> : product?.name}
                            </h2>

                            {product && (
                                <Badge variant={product.isActive ? "default" : "secondary"}>
                                    {product.isActive ? "Active" : "Inactive"}
                                </Badge>
                            )}
                        </div>

                        {product?.shortDescription && (
                            <p className="mt-4 text-muted-foreground">
                                {product.shortDescription}
                            </p>
                        )}

                        {product?.description && (
                            <p className="mt-2 text-sm text-muted-foreground">
                                {product.description}
                            </p>
                        )}
                    </div>

                    {/* Categories */}
                    {product && (product.categories.length > 0 || product.subcategories.length > 0) && (
                        <div className="rounded-2xl border bg-background p-4">
                            <h3 className="mb-4 text-lg font-semibold">
                                Categories
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {product.categories.map((category) => (
                                    <span
                                        key={category}
                                        className="rounded-full border px-2.5 py-1 text-sm font-medium"
                                    >
                                        {category}
                                    </span>
                                ))}

                                {product.subcategories.map((subcategory) => (
                                    <span
                                        key={subcategory}
                                        className="rounded-full border border-dashed px-2.5 py-1 text-sm text-muted-foreground"
                                    >
                                        {subcategory}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="rounded-2xl border bg-background p-4">
                        <h3 className="mb-4 text-lg font-semibold">
                            Pricing
                        </h3>

                        <div className="grid gap-5 grid-cols-3">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Selling Price
                                </p>

                                <p className="mt-1 text-xl font-semibold">
                                    ₹{product?.sellingPrice}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    MRP
                                </p>

                                <p className="mt-1 text-xl font-semibold line-through">
                                    ₹{product?.mrp}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    GST
                                </p>

                                <p className="mt-1 text-xl font-semibold">
                                    {product?.tax}%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-background p-4">
                        <h3 className="mb-5 text-lg font-semibold">
                            Product Details
                        </h3>

                        <div className="grid gap-5 grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Weight
                                </p>

                                <p className="font-medium">
                                    {product?.weight}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Unit
                                </p>

                                <p className="font-medium">
                                    {product?.unit}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Shelf Life
                                </p>

                                <p className="font-medium">
                                    {product?.shelfLife}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Country
                                </p>

                                <p className="font-medium">
                                    {product?.country}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-background p-4">
                        <h3 className="mb-5 text-lg font-semibold">
                            Sales
                        </h3>

                        <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Times Buy
                                </p>

                                <p className="font-medium">
                                    {product?.numberOfTimesBuy}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Sold
                                </p>

                                <p className="font-medium">
                                    {product?.totalSold}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Revenue
                                </p>

                                <p className="font-medium">
                                    ₹{product?.totalRevenue}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Rating
                                </p>

                                <p className="font-medium">
                                    {product?.averageRating}
                                    <span className="ml-1 text-sm text-muted-foreground">
                                        ({product?.numberOfReviews})
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-background p-4">
                        <h3 className="mb-5 text-lg font-semibold">
                            Additional Information
                        </h3>

                        <div className="grid gap-5 grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Created At
                                </p>

                                <p className="font-medium">
                                    {product ? formatDate(product.createdAt) : "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Updated At
                                </p>

                                <p className="font-medium">
                                    {product ? formatDate(product.updatedAt) : "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Product ID
                                </p>

                                <p className="font-medium break-all">
                                    {product?.id ?? "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Slug
                                </p>

                                <p className="font-medium break-all">
                                    {product?.slug ?? "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}