"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FolderTree, CheckCircle2, XCircle, Package, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Stats = {
    total: number;
    active: number;
    inactive: number;
};

type StatItem = {
    title: string;
    key: string;
    value?: number;
    icon: typeof FolderTree;
    color: string;
    bg: string;
};

const baseStats: StatItem[] = [
    {
        title: "Total Categories",
        key: "total",
        icon: FolderTree,
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-950/30",
    },
    {
        title: "Active Categories",
        key: "active",
        icon: CheckCircle2,
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-950/30",
    },
    {
        title: "Inactive Categories",
        key: "inactive",
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-100 dark:bg-red-950/30",
    },
    {
        title: "Products Assigned",
        key: "products",
        value: 1000,
        icon: Package,
        color: "text-orange-600",
        bg: "bg-orange-100 dark:bg-orange-950/30",
    },
];

export default function CategoryStats() {
    const [stats, setStats] = useState<Stats>({ total: 0, active: 0, inactive: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const response = await axios.get("/api/admin/categories/stats");
                if (active) setStats(response.data?.stats ?? { total: 0, active: 0, inactive: 0 });
            } catch (error) {
                const err = error as { response?: { data?: { message?: string } } };
                toast.error(err.response?.data?.message || "Failed to load stats.");
            } finally {
                if (active) setIsLoading(false);
            }
        })();
        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="grid gap-2 md:gap-4 grid-cols-2 xl:grid-cols-5">
            {baseStats.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="p-3 rounded-2xl border bg-background transition hover:shadow-md"
                    >
                        <div className="flex items-start justify-between gap-2 md:gap-4">
                            <div className={`rounded-md md:rounded-xl p-1 md:p-3 mt-1 md:mt-0 ${item.bg}`}>
                                <Icon className={`h-4 w-4 md:h-6 md:w-6 ${item.color}`} />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    {item.value !== undefined
                                        ? item.value.toLocaleString()
                                        : isLoading
                                          ? <Skeleton className="h-7 w-10 mb-3" />
                                          : stats[item.key as keyof Stats].toLocaleString()}
                                </h2>
                                <p className="mt-0 md:mt-1 text-xs md:text-sm text-muted-foreground">
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}