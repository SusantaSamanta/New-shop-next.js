"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ProductForm() {
    return (
        <form className="space-y-4">

            {/* Basic Information */}

            <div className="rounded-2xl border bg-background p-3 md:p-4 space-y-4">

                <h2 className="text-lg font-semibold">
                    Basic Information
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                    <div className="space-y-2">
                        <Label>Product Name</Label>
                        <Input placeholder="Amul Gold Milk" />
                    </div>

                    <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input placeholder="amul-gold-milk" />
                    </div>

                </div>

                <div className="space-y-2">
                    <Label>Short Description</Label>
                    <Input placeholder="Short description..." />
                </div>

                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                        rows={5}
                        placeholder="Full product description..."
                    />
                </div>

            </div>

            {/* Category */}

            <div className="rounded-2xl border p-3 md:p-4">


                <div className="flex flex-wrap gap-5">
                    <span className="w-full md:w-auto md:mr-10 text-lg font-semibold col-span-1 ">
                        Category
                    </span>

                    <div className="space-y-2 col-span-2">
                        <Label>Category</Label>

                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="vegetables">
                                    Vegetables
                                </SelectItem>

                                <SelectItem value="fruits">
                                    Fruits
                                </SelectItem>

                                <SelectItem value="dairy">
                                    Dairy
                                </SelectItem>

                                <SelectItem value="snacks">
                                    Snacks
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 col-span-2">
                        <Label>Sub Category</Label>

                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Sub Category" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="milk">
                                    Milk
                                </SelectItem>

                                <SelectItem value="chips">
                                    Chips
                                </SelectItem>

                                <SelectItem value="leafy">
                                    Leafy Vegetables
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>

            </div>

            {/* Pricing */}

            <div className="rounded-2xl border p-3 md:p-4 space-y-4">

                <h2 className="text-lg font-semibold">
                    Pricing
                </h2>

                <div className="grid gap-5 md:grid-cols-3">

                    <div className="space-y-2">
                        <Label>MRP</Label>
                        <Input type="number" placeholder="50" />
                    </div>

                    <div className="space-y-2">
                        <Label>Selling Price</Label>
                        <Input type="number" placeholder="45" />
                    </div>

                    <div className="space-y-2">
                        <Label>Tax (%)</Label>
                        <Input type="number" placeholder="5" />
                    </div>

                </div>

            </div>

            {/* Product Details */}

            <div className="rounded-2xl border bg-background  p-3 md:p-4 space-y-4">

                <h2 className="text-lg font-semibold">
                    Product Details
                </h2>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                    <div className="space-y-2">
                        <Label>Weight</Label>
                        <Input placeholder="500" />
                    </div>

                    <div className="space-y-2">
                        <Label>Unit</Label>

                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Unit" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="gm">Gram</SelectItem>
                                <SelectItem value="kg">Kg</SelectItem>
                                <SelectItem value="ml">ML</SelectItem>
                                <SelectItem value="ltr">Liter</SelectItem>
                                <SelectItem value="pcs">Pieces</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Shelf Life</Label>
                        <Input placeholder="6 Months" />
                    </div>

                    <div className="space-y-2">
                        <Label>Country</Label>
                        <Input placeholder="India" />
                    </div>

                </div>

            </div>

            {/* Images */}

            <div className="rounded-2xl border bg-background  p-3 md:p-4 space-y-4">

                <h2 className="text-lg font-semibold">
                    Product Images
                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                    <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        <Input
                            placeholder="https://localhost/adimn/image"
                            type="text" />
                    </div>

                    <div className="space-y-2">
                        <Label>Gallery Images</Label>
                        <Input
                            placeholder="https://localhost/adimn/image"
                            type="text"
                        // multiple
                        />
                    </div>

                </div>

            </div>

            {/* Status */}

            <div className="flex rounded-2xl border  p-3 md:p-4">

                <h2 className="mr-6 md:mr-10 text-lg font-semibold">
                    Status
                </h2>

                <Select
                    defaultValue="active">
                    <SelectTrigger className="max-w-xs">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="active">
                            Active
                        </SelectItem>

                        <SelectItem value="inactive">
                            Inactive
                        </SelectItem>
                    </SelectContent>
                </Select>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3">

                <Button
                    type="button"
                    variant="outline"
                    className="p-5"
                >
                    Reset
                </Button>

                <Button type="submit"
                    className="p-5"
                >
                    Save Product
                </Button>

            </div>

        </form>
    );
}