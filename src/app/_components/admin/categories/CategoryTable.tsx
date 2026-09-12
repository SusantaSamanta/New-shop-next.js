"use client";

import Link from "next/link";
import {
    Eye,
    Pencil,
    Trash2,
    MoreHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
    {
        id: 1,
        image: "🥬",
        name: "Vegetables",
        products: 142,
        status: "Active",
        created: "15 Jul 2026",
    },
    {
        id: 2,
        image: "🍎",
        name: "Fruits",
        products: 98,
        status: "Active",
        created: "14 Jul 2026",
    },
    {
        id: 3,
        image: "🥛",
        name: "Dairy",
        products: 76,
        status: "Active",
        created: "13 Jul 2026",
    },
    {
        id: 4,
        image: "🍞",
        name: "Bakery",
        products: 54,
        status: "Inactive",
        created: "12 Jul 2026",
    },
    {
        id: 5,
        image: "🥤",
        name: "Beverages",
        products: 121,
        status: "Active",
        created: "11 Jul 2026",
    },
];

export default function CategoryTable() {
    return (
        <div className="overflow-hidden rounded-2xl border bg-background">
            <div className="overflow-x-auto">
                <table className="w-full min-w-220">
                    <thead className="border-b bg-muted/50">
                        <tr className="text-left">
                            <th className="px-6 py-2 font-semibold">
                                Image
                            </th>

                            <th className="px-6 py-2 font-semibold">
                                Category
                            </th>

                            <th className="px-6 py-2 font-semibold">
                                Products
                            </th>

                            <th className="px-6 py-2 font-semibold">
                                Status
                            </th>

                            <th className="px-6 py-2 font-semibold">
                                Created
                            </th>

                            <th className="px-6 py-2 font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category) => (
                            <tr
                                key={category.id}
                                className="border-b last:border-0 hover:bg-muted/40"
                            >
                                <td className="px-6 py-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                                        {category.image}
                                    </div>
                                </td>

                                <td className="px-6 py-3">
                                    <p className="font-medium">
                                        {category.name}
                                    </p>
                                </td>

                                <td className="px-6 py-3">
                                    {category.products}
                                </td>

                                <td className="px-6 py-3">
                                    <Badge
                                        variant={
                                            category.status === "Active"
                                                ? "default"
                                                : "secondary"
                                        }
                                    >
                                        {category.status}
                                    </Badge>
                                </td>

                                <td className="px-6 py-3 text-muted-foreground">
                                    {category.created}
                                </td>

                                <td className="px-6 py-3">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/admin/categories/${category.id}`}
                                                >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </Link>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/admin/categories/edit/${category.id}`}
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}