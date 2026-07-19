import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProductDetailsPage() {
    return (
        <div className="space-y-4">
            {/* Header */}

            <div className="flex items-center justify-between">
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
                            Product Details
                        </h1>

                        <p className="text-muted-foreground">
                            View complete product information.
                        </p>
                    </div>
                </div>

                <Button asChild>
                    <Link href="/admin/products/1/edit">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Product
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Images */}

                <div className="grid grid-cols-4 gap-4 rounded-2xl border-4 p-3 md:p-4 md:block">
                    {/* Main Image */}
                    <div className="col-span-3">
                        <Image
                            src="https://picsum.photos/500"
                            alt="product"
                            width={500}
                            height={500}
                            className="h-full w-full rounded-xl object-cover"
                        />
                    </div>

                    {/* Gallery */}
                    <div className="col-span-1 flex flex-col gap-3 md:mt-4 md:grid md:grid-cols-4">
                        {[1, 2, 3, 4].map((item) => (
                            <Image
                                key={item}
                                src={`https://picsum.photos/100?random=${item}`}
                                alt=""
                                width={100}
                                height={100}
                                className="aspect-square w-full rounded-lg object-cover"
                            />
                        ))}
                    </div>
                </div>

                {/* Details */}

                <div className="md:col-span-2 space-y-4">

                    <div className="rounded-2xl border bg-background p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">
                                Amul Gold Milk
                            </h2>

                            {/* <Badge>Active</Badge> */}Active
                        </div>

                        <p className="mt-4 text-muted-foreground">
                            Fresh full cream milk suitable for tea,
                            coffee and daily consumption.
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-background p-6">
                        <h3 className="mb-5 text-lg font-semibold">
                            Pricing
                        </h3>

                        <div className="grid gap-5 sm:grid-cols-3">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Selling Price
                                </p>

                                <p className="mt-1 text-xl font-semibold">
                                    ₹34
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    MRP
                                </p>

                                <p className="mt-1 text-xl font-semibold line-through">
                                    ₹38
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    GST
                                </p>

                                <p className="mt-1 text-xl font-semibold">
                                    5%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-background p-6">
                        <h3 className="mb-5 text-lg font-semibold">
                            Product Details
                        </h3>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Weight
                                </p>

                                <p className="font-medium">
                                    500
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Unit
                                </p>

                                <p className="font-medium">
                                    ml
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Shelf Life
                                </p>

                                <p className="font-medium">
                                    6 Months
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Country
                                </p>

                                <p className="font-medium">
                                    India
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-background p-6">
                        <h3 className="mb-5 text-lg font-semibold">
                            Additional Information
                        </h3>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Created At
                                </p>

                                <p className="font-medium">
                                    18 July 2026
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Updated At
                                </p>

                                <p className="font-medium">
                                    20 July 2026
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Product ID
                                </p>

                                <p className="font-medium">
                                    PRD-10021
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Slug
                                </p>

                                <p className="font-medium">
                                    amul-gold-milk
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}