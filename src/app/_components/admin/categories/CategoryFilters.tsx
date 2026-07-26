"use client";

import { Search, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CategoryFilters() {
    return (
        <div className="rounded-2xl  bg-background p-0">
            <div className="grid  gap-4  grid-cols-5 lg:grid-cols-12">

                {/* Search */}

                <div className="relative col-span-5 lg:col-span-5">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search category..."
                        className="pl-10"
                    />
                </div>

                {/* Status */}
                <div className="col-span-2 lg:col-span-2">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>

                        <SelectContent position="popper" sideOffset={4}>
                            <SelectItem value="all">
                                All Status
                            </SelectItem>

                            <SelectItem value="active">
                                Active
                            </SelectItem>

                            <SelectItem value="inactive">
                                Inactive
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Sort */}
                <div className="col-span-2 lg:col-span-2">

                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>

                        <SelectContent position="popper" sideOffset={4}>
                            <SelectItem value="newest">
                                Newest First
                            </SelectItem>

                            <SelectItem value="oldest">
                                Oldest First
                            </SelectItem>

                            <SelectItem value="az">
                                A - Z
                            </SelectItem>

                            <SelectItem value="za">
                                Z - A
                            </SelectItem>

                            <SelectItem value="products-high">
                                Most Products
                            </SelectItem>

                            <SelectItem value="products-low">
                                Least Products
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* Reset */}
                <div className="col-span-1 ">
                    <Button
                        variant="outline"
                        className="w-full"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}