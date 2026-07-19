"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  {
    id: 1,
    image: "🥛",
    name: "Amul Gold Milk",
    price: 34,
    mrp: 38,
    unit: "500 ml",
    status: "Active",
    created: "15 Jul 2026",
  },
  {
    id: 2,
    image: "🍅",
    name: "Fresh Tomato",
    price: 42,
    mrp: 50,
    unit: "1 Kg",
    status: "Active",
    created: "14 Jul 2026",
  },
  {
    id: 3,
    image: "🍞",
    name: "Brown Bread",
    price: 45,
    mrp: 55,
    unit: "400 g",
    status: "Inactive",
    created: "13 Jul 2026",
  },
  {
    id: 4,
    image: "🥚",
    name: "Farm Eggs",
    price: 82,
    mrp: 90,
    unit: "12 pcs",
    status: "Active",
    created: "12 Jul 2026",
  },
  {
    id: 5,
    image: "🍌",
    name: "Banana",
    price: 60,
    mrp: 65,
    unit: "1 Dozen",
    status: "Active",
    created: "11 Jul 2026",
  },
];

export default function ProductTable() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background">
      <div className="overflow-x-auto">
        <table className="w-full min-w-240">
          <thead className="border-b bg-muted/50">
            <tr className="text-left">
              <th className="px-6 py-4 font-semibold">Image</th>
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">MRP</th>
              <th className="px-6 py-4 font-semibold">Unit</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Created</th>
              <th className="px-6 py-4 text-right font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b last:border-0 hover:bg-muted/40"
              >
                <td className="px-6 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                    {product.image}
                  </div>
                </td>

                <td className="px-6 py-4 font-medium">
                  {product.name}
                </td>

                <td className="px-6 py-4">
                  ₹{product.price}
                </td>

                <td className="px-6 py-4 text-muted-foreground line-through">
                  ₹{product.mrp}
                </td>

                <td className="px-6 py-4">
                  {product.unit}
                </td>

                <td className="px-6 py-4">
                  {/* <Badge
                    variant={
                      product.status === "Active"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {product.status}
                  </Badge> */}
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {product.created}
                </td>

                <td className="px-6 py-4 text-right">
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
                          href={`/admin/products/${product.id}`}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
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