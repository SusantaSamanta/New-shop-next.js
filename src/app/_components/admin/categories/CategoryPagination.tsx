"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type CategoryPaginationProps = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    onPageChange: (page: number) => void;
};

export default function CategoryPagination({
    page,
    limit,
    total,
    totalPages,
    hasPrevPage,
    hasNextPage,
    onPageChange,
}: CategoryPaginationProps) {
    const from = total === 0 ? 0 : (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col gap-4 rounded-2xl border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{from}</span> to{" "}
                <span className="font-medium">{to}</span> of{" "}
                <span className="font-medium">{total}</span> categories
            </p>

            <div className="flex items-center gap-2">

                <Button
                    variant="outline"
                    size="icon"
                    disabled={!hasPrevPage}
                    onClick={() => onPageChange(page - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {pages.map((p) => (
                    <Button
                        key={p}
                        size="icon"
                        variant={p === page ? "default" : "outline"}
                        onClick={() => onPageChange(p)}
                    >
                        {p}
                    </Button>
                ))}

                <Button
                    variant="outline"
                    size="icon"
                    disabled={!hasNextPage}
                    onClick={() => onPageChange(page + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

            </div>

        </div>
    );
}