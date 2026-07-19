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
import { categories } from "../../../../../assets/category icons/category images";

export default function ProductFilters() {




    return (
        <div className="rounded-2xl  bg-background p-0">
            <div className="grid  gap-4  grid-cols-5 lg:grid-cols-12">

                {/* Search */}
                <div className="relative col-span-5 lg:col-span-5">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search by product name..."
                        className="pl-10"
                    />
                </div>


                {/* Sort */}
                <div className="col-span-2 lg:col-span-2">
                    <Select defaultValue="latest">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>

                        <SelectContent position="popper" sideOffset={4}>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                            <SelectItem value="price-low">
                                Price (Low → High)
                            </SelectItem>
                            <SelectItem value="price-high">
                                Price (High → Low)
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>



                {/* Unit */}
                <div className="col-span-2 lg:col-span-2">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Unit" />
                        </SelectTrigger>

                        <SelectContent position="popper" sideOffset={4}>
                            <SelectItem value="all">All Category</SelectItem>
                            {
                                categories.map((item) => {
                                    return <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                })
                            }
                        </SelectContent>
                    </Select>

                </div>


                {/* Reset */}
                <div className="col-span-1 lg:col-span-1">
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