"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import {
    Pencil,
    Trash2,
    FolderTree,
    MoreHorizontal,
    Loader2,
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
import CategoryPagination from "./CategoryPagination";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryFilters from "./CategoryFilters";

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

type Category = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
};

type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

type Status = "all" | "active" | "inactive"

export default function CategoryTable() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deletedIds, setDeletedIds] = useState<string[]>([]);
    const [currentStatus, setCurrentStatus] = useState<Status>(() => {
        if (typeof window === "undefined") return "all";
        const urlStatus = new URLSearchParams(window.location.search).get("status");
        return urlStatus === "active" || urlStatus === "inactive" ? (urlStatus as Status) : "all";
    });

    const [loadPagination, setLoadPagination] = useState(true);

    const [page, setPage] = useState(() => {
        if (typeof window === "undefined") return 1;
        const urlPage = parseInt(new URLSearchParams(window.location.search).get("page") || "1");
        return Number.isNaN(urlPage) || urlPage < 1 ? 1 : urlPage;
    });
    const [limit] = useState(5);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        const params = new URLSearchParams();
        if (newPage > 1) params.set("page", String(newPage));
        if (currentStatus !== "all") params.set("status", currentStatus);
        const query = params.toString();
        router.replace(query ? `?${query}` : "?", { scroll: false });
    };

    const fetchCategories = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get("/api/admin/categories", {
                params: { page, limit, status: currentStatus },
            });
            setCategories(response.data?.categories ?? []);
            setPagination(response.data?.pagination ?? null);
            setDeletedIds([]);
        } catch (error) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err.response?.data?.message || "Failed to load categories.");
        } finally {
            setIsLoading(false);
            setLoadPagination(false); // only first time page load this run 
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchCategories();
        }, 0);
        return () => clearTimeout(timeout);
    }, [page, limit, currentStatus]);

    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const handleDelete = async () => {
        if (!categoryToDelete) return;

        setDeletingId(categoryToDelete.id);
        try {
            const response = await axios.delete(`/api/admin/categories/${categoryToDelete.id}`);
            toast.success(response.data.message);
            setDeletedIds((prev) => [...prev, categoryToDelete.id]);
            setCategoryToDelete(null);
        } catch (error) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err.response?.data?.message || "Something went wrong.");
            setCategoryToDelete(null);
        } finally {
            setDeletingId(null);
        }
    };

    const handleStatusChange = (status: Status) => {
        if (isLoading) return;
        setCurrentStatus(status)
        setLoadPagination(true);
        setPage(1);
        const params = new URLSearchParams();
        if (status !== "all") params.set("status", status);
        const query = params.toString();
        router.replace(query ? `?${query}` : "?", { scroll: false });
    }


    return (

        <div className="gap-4 flex flex-col">
            
    
            {/* Search and filter */}
            <CategoryFilters status={currentStatus} blockChange={isLoading} handleStatusChange={handleStatusChange} refetch={fetchCategories}/>

            {
                isLoading ? <CategoryTableSkeleton row={limit} loadPagination={loadPagination} /> :


                    <div className="overflow-hidden rounded-2xl border bg-background">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-220">
                                <thead className="border-b bg-muted/50">
                                    <tr className="text-left">
                                        <th className="px-6 py-2 font-semibold">Image</th>

                                        <th className="px-6 py-2 font-semibold">Category</th>

                                        <th className="px-6 py-2 font-semibold">Products</th>

                                        <th className="px-6 py-2 font-semibold">Status</th>

                                        <th className="px-6 py-2 font-semibold">Sort Order</th>

                                        <th className="px-6 py-2 font-semibold">Created</th>

                                        <th className="px-6 py-2 font-semibold">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {categories.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                                                No categories found.
                                            </td>
                                        </tr>
                                    ) : (
                                        categories.map((category) => (
                                            <tr
                                                key={category.id}
                                                className={`border-b last:border-0 hover:bg-muted/40 ${
                                                    deletedIds.includes(category.id)
                                                        ? "pointer-events-none opacity-20"
                                                        : ""
                                                }`}
                                            >
                                                <td className="px-6 py-3">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                                                        {category.image ? (
                                                            <img
                                                                src={category.image}
                                                                alt={category.name}
                                                                className="h-12 w-12 rounded-xl object-cover"
                                                            />
                                                        ) : (
                                                            <FolderTree className="h-6 w-6 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-3">
                                                    <p className="font-medium">
                                                        {category.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {category.slug}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-3">
                                                    0
                                                </td>

                                                <td className="px-6 py-3">
                                                    <Badge
                                                        variant={category.isActive ? "default" : "secondary"}
                                                    >
                                                        {category.isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                </td>

                                                <td className="px-6 py-3 text-muted-foreground">
                                                    {category.sortOrder}
                                                </td>

                                                <td className="px-6 py-3 text-muted-foreground">
                                                    {new Date(category.createdAt).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </td>

                                                <td className="px-6 py-3">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                disabled={deletedIds.includes(category.id)}
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>

                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem asChild>
                                                                <Link
                                                                    href={`/admin/categories/edit/${category.id}`}
                                                                >
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>

                                                            <DropdownMenuSeparator />

                                                            <DropdownMenuItem
                                                                className="text-red-600 focus:text-red-600"
                                                                onSelect={() => setCategoryToDelete(category)}
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
            <CategoryPagination
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
                open={!!categoryToDelete}
                onOpenChange={(open) => {
                    if (!open) setCategoryToDelete(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-foreground">
                                &quot;{categoryToDelete?.name}&quot;
                            </span>
                            ? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={deletingId === categoryToDelete?.id}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500"
                            disabled={deletingId === categoryToDelete?.id}
                            onClick={(event) => {
                                event.preventDefault();
                                handleDelete();
                            }}
                        >
                            {deletingId === categoryToDelete?.id && (
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







function CategoryTableSkeleton({ row, loadPagination }: { row: number, loadPagination: boolean }) {
    return (
        <>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border bg-background">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-220">

                        {/* Header */}
                        <thead className="border-b bg-muted/50">
                            <tr className="text-left">
                                <th className="px-6 py-2 font-semibold">Image</th>
                                <th className="px-6 py-2 font-semibold">Category</th>
                                <th className="px-6 py-2 font-semibold">Products</th>
                                <th className="px-6 py-2 font-semibold">Status</th>
                                <th className="px-6 py-2 font-semibold">Sort Order</th>
                                <th className="px-6 py-2 font-semibold">Created</th>
                                <th className="px-6 py-2 font-semibold">Actions</th>
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

                                    {/* Category */}
                                    <td className="px-6 py-3">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                    </td>

                                    {/* Products */}
                                    <td className="px-6 py-3">
                                        <Skeleton className="h-4 w-8" />
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-3">
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                    </td>

                                    {/* Sort Order */}
                                    <td className="px-6 py-3">
                                        <Skeleton className="h-4 w-8" />
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






