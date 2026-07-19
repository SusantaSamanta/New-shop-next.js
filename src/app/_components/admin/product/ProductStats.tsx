"use client";

import {
    Package,
    CheckCircle2,
    XCircle,
    Sparkles,
} from "lucide-react";

const stats = [
    {
        title: "Total Products",
        value: "1,286",
        icon: Package,
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-950/30",
    },
    {
        title: "Active Products",
        value: "1,198",
        icon: CheckCircle2,
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-950/30",
    },
    {
        title: "Inactive Products",
        value: "88",
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-100 dark:bg-red-950/30",
    },
      {
        title: "Recently Added",
        value: "46",
        icon: Sparkles,
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-950/30",
      },
];

export default function ProductStats() {
    return (
        <div className="grid gap-2 md:gap-4 grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
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
                                    {item.value}
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