"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  Loader2,
  Package,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import ProductPagination from "./ProductPagination";
import ProductFilters from "./ProductFilters";



type Product = {
  id: string,
  name: string,
  slug: string,
  shortDescription: string,
  description: string,
  categories: [],
  subcategories: [],
  mrp: number,
  sellingPrice: number,
  tax: number,
  weight: string,
  unit: string,
  shelfLife: string,
  country: string,
  totalSold: number,
  thumbnail: string,
  galleryImages: [],
  isActive: boolean,
  createdAt: string
}

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}


export default function ProductTable() {

  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  type Status = "all" | "active" | "inactive"
  const [limit] = useState(5);
  const [page, setPage] = useState(() => {
    if (typeof window === "undefined") return 1;
    const urlPage = parseInt(new URLSearchParams(window.location.search).get("page") || "1");
    return Number.isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;
  });
  const [currentStatus, setCurrentStatus] = useState<Status>(() => {
    if (typeof window === "undefined") return "all";
    const urlStatus = new URLSearchParams(window.location.search).get("status");
    return urlStatus === "active" || urlStatus === "inactive" ? (urlStatus as Status) : "all";
  });
  const [loadPagination, setLoadPagination] = useState(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", String(newPage));
    if (currentStatus !== "all") params.set("status", currentStatus);
    const query = params.toString();
    router.replace(query ? `?${query}` : "?", { scroll: false });
  };

  const handleStatusChange = (status: Status) => {
    if (isLoading) return;
    setCurrentStatus(status);
    setLoadPagination(true);
    setPage(1);
    const params = new URLSearchParams();
    if (status !== "all") params.set("status", status);
    const query = params.toString();
    router.replace(query ? `?${query}` : "?", { scroll: false });
  };

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/api/admin/product", {
        params: { page, limit, status: currentStatus },
      });
      setProducts(response.data?.products ?? []);
      setPagination(response.data?.pagination ?? null);
      setDeletedIds([]);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to load products.");
    } finally {
      setIsLoading(false);
      setLoadPagination(false); // only first time page load this run 
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 0);
    return () => clearTimeout(timeout);
  }, [page, limit, currentStatus]);

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDelete = async () => {
    if (!productToDelete) return;

    setDeletingId(productToDelete.id);
    try {
      const response = await axios.delete(`/api/admin/product/${productToDelete.id}`);
      toast.success(response.data.message);
      setDeletedIds((prev) => [...prev, productToDelete.id]);
      setProductToDelete(null);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Something went wrong.");
      setProductToDelete(null);
    } finally {
      setDeletingId(null);
    }
  };


  return (
    <div className="gap-4 flex flex-col">

      {/* Search and filter */}
      <ProductFilters
        status={currentStatus}
        blockChange={isLoading}
        handleStatusChange={handleStatusChange}
        refetch={fetchProducts}
      />

      {
        isLoading ? <ProductTableSkeleton row={limit} loadPagination={loadPagination} /> :

          <div className="overflow-hidden rounded-2xl border bg-background">
            <div className="overflow-x-auto">
              <table className="w-full min-w-240">
                <thead className="border-b bg-muted/50">
                  <tr className="text-left">
                    <th className="px-6 py-4 font-semibold">Image</th>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">MRP</th>
                    <th className="px-6 py-4 font-semibold">Weight</th>
                    <th className="px-6 py-4 font-semibold">Shelf Life</th>
                    <th className="px-6 py-4 font-semibold">Total Sold</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Created</th>
                    <th className="px-6 py-4 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-6 py-10 text-center text-muted-foreground">
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr
                        key={product.id}
                        className={`border-b last:border-0 hover:bg-muted/40 ${
                          deletedIds.includes(product.id)
                            ? "pointer-events-none opacity-20"
                            : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                            {product.thumbnail ? (
                              <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="h-12 w-12 rounded-xl object-cover"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-3">
                          <p className="font-medium">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.slug}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          ₹{product.sellingPrice}
                        </td>

                        <td className="px-6 py-4 text-muted-foreground line-through">
                          ₹{product.mrp}
                        </td>

                        <td className="px-6 py-4">
                          {product.weight} {product.unit}
                        </td>

                        <td className="px-6 py-4">
                          {product.shelfLife}
                        </td>

                        <td className="px-6 py-4">
                          {product.totalSold}
                        </td>

                        <td className="px-6 py-4">
                          <Badge variant={product.isActive ? "default" : "secondary"}  >
                            {product.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </td>

                        <td className="px-6 py-4 text-muted-foreground">
                          {new Date(product.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={deletedIds.includes(product.id)}
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
                                  href={`/admin/products/edit/${product.id}`}
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem className="text-red-600 focus:text-red-600"
                                onSelect={() => setProductToDelete(product)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
      }
      {/* Pagination */}
      {!loadPagination &&
        <ProductPagination
          page={pagination?.page ?? page}
          limit={limit}
          total={pagination?.total ?? 0}
          totalPages={pagination?.totalPages ?? 0}
          hasPrevPage={pagination?.hasPrevPage ?? false}
          hasNextPage={pagination?.hasNextPage ?? false}
          onPageChange={handlePageChange}
        />}

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={!!productToDelete}
        onOpenChange={(open) => {
          if (!open) setProductToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                &quot;{productToDelete?.name}&quot;
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deletingId === productToDelete?.id}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500"
              disabled={deletingId === productToDelete?.id}
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
            >
              {deletingId === productToDelete?.id && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}






function ProductTableSkeleton({ row, loadPagination }: { row: number, loadPagination: boolean }) {
  return (
    <>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full min-w-220">

            {/* Header */}
            <thead className="border-b bg-muted/50">
              <tr className="text-left">
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">MRP</th>
                <th className="px-6 py-4 font-semibold">Weight</th>
                <th className="px-6 py-4 font-semibold">Shelf Life</th>
                <th className="px-6 py-4 font-semibold">Total Sold</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Created</th>
                <th className="px-6 py-4 text-right font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            {/* Skeleton Rows */}
            <tbody>
              {Array.from({ length: row }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b last:border-0"
                >
                  {/* Image */}
                  <td className="px-6 py-3">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                  </td>

                  {/* product */}
                  <td className="px-6 py-3">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </td>

                  {/* price */}
                  <td className="px-6 py-3">
                    <Skeleton className="h-4 w-8" />
                  </td>

                  {/* mrp */}
                  <td className="px-6 py-3">
                    <Skeleton className="h-4 w-8" />
                  </td>

                  {/* weight */}
                  <td className="px-6 py-3">
                    <Skeleton className="h-4 w-8" />
                  </td>

                  {/* Shelf Life */}
                  <td className="px-6 py-3">
                    <Skeleton className="h-4 w-8" />
                  </td>

                  {/* Total */}
                  <td className="px-6 py-3">
                    <Skeleton className="h-4 w-8" />
                  </td>

                  {/* Status */}
                  <td className="px-6 py-3">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>


                  {/* Created */}
                  <td className="px-6 py-3">
                    <Skeleton className="h-4 w-24" />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-3">
                    <Skeleton className="h-9 w-9 rounded-md" />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Pagination Skeleton */}
      {loadPagination &&
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-30" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      }
    </>
  );
}






