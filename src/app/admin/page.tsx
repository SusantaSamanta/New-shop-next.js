"use client";

import {
    Package,
    FolderTree,
    Store,
    Users,
    ImageIcon,
    TicketPercent,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
} from "lucide-react";

const stats = [
    {
        title: "Total Products",
        value: "1,284",
        change: "+12%",
        positive: true,
        icon: Package,
    },
    {
        title: "Categories",
        value: "18",
        change: "+2",
        positive: true,
        icon: FolderTree,
    },
    {
        title: "Stores",
        value: "12",
        change: "+1",
        positive: true,
        icon: Store,
    },
    {
        title: "Customers",
        value: "8,426",
        change: "+8%",
        positive: true,
        icon: Users,
    },
    {
        title: "Home Banners",
        value: "6",
        change: "-1",
        positive: false,
        icon: ImageIcon,
    },
    {
        title: "Coupons",
        value: "14",
        change: "+4",
        positive: true,
        icon: TicketPercent,
    },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Greeting */}
            <div className="rounded-2xl border bg-linear-to-r from-green-600 to-emerald-500 p-8 text-white">
                <h1 className="text-3xl font-bold">
                    Welcome back, Admin 👋
                </h1>

                <p className="mt-2 text-green-100">
                    Manage your FreshNext grocery platform from one place.
                </p>
            </div>

            {/* Statistics */}

            <section>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {stats.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="rounded-2xl border bg-background p-6 transition hover:shadow-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="rounded-xl bg-primary/10 p-3">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>

                                    <div
                                        className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${item.positive
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                            }`}
                                    >
                                        {item.positive ? (
                                            <ArrowUpRight size={14} />
                                        ) : (
                                            <ArrowDownRight size={14} />
                                        )}

                                        {item.change}
                                    </div>
                                </div>

                                <h2 className="mt-6 text-3xl font-bold">{item.value}</h2>

                                <p className="mt-1 text-muted-foreground">
                                    {item.title}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Quick Actions */}

            <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border bg-background p-6">
                    <h2 className="mb-5 text-lg font-semibold">
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            "Add Product",
                            "Add Category",
                            "Create Store",
                            "Create Coupon",
                            "Upload Banner",
                            "View Customers",
                        ].map((item) => (
                            <button
                                key={item}
                                className="rounded-xl border p-4 text-left transition hover:bg-muted"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Top Performing Stores */}

                <div className="rounded-2xl border bg-background p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">
                            Top Performing Stores
                        </h2>

                        <button className="text-sm text-primary hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="space-y-5">
                        {[
                            {
                                name: "Kolkata Central",
                                revenue: "₹8.4L",
                                orders: 1245,
                                growth: "+18%",
                            },
                            {
                                name: "Salt Lake",
                                revenue: "₹7.1L",
                                orders: 1096,
                                growth: "+14%",
                            },
                            {
                                name: "Howrah",
                                revenue: "₹6.5L",
                                orders: 986,
                                growth: "+11%",
                            },
                            {
                                name: "New Town",
                                revenue: "₹5.9L",
                                orders: 904,
                                growth: "+8%",
                            },
                        ].map((store, index) => (
                            <div
                                key={store.name}
                                className="flex items-center justify-between rounded-xl border p-4 hover:bg-muted/50 transition"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                                        #{index + 1}
                                    </div>

                                    <div>
                                        <p className="font-semibold">{store.name}</p>

                                        <p className="text-sm text-muted-foreground">
                                            {store.orders} Orders
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">{store.revenue}</p>

                                    <span className="text-sm font-medium text-green-600">
                                        {store.growth}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* System Status & Low Stock */}

            <section className="grid gap-6 lg:grid-cols-2">
                {/* Low Stock Products */}

                <div className="rounded-2xl border bg-background p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">
                            Low Stock Products
                        </h2>

                        <button className="text-sm text-primary hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                name: "Fresh Apple",
                                stock: 8,
                            },
                            {
                                name: "Organic Milk",
                                stock: 5,
                            },
                            {
                                name: "Brown Bread",
                                stock: 3,
                            },
                            {
                                name: "Tomato",
                                stock: 9,
                            },
                        ].map((item) => (
                            <div
                                key={item.name}
                                className="flex items-center justify-between rounded-xl border p-4"
                            >
                                <div>
                                    <p className="font-medium">{item.name}</p>

                                    <p className="text-sm text-muted-foreground">
                                        Remaining Stock
                                    </p>
                                </div>

                                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                    {item.stock}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform Status */}

                <div className="rounded-2xl border bg-background p-6">
                    <h2 className="mb-6 text-lg font-semibold">
                        Platform Status
                    </h2>

                    <div className="space-y-5">
                        {[
                            {
                                label: "Active Stores",
                                value: "12 / 12",
                                color: "bg-green-500",
                            },
                            {
                                label: "Products Available",
                                value: "98%",
                                color: "bg-green-500",
                            },
                            {
                                label: "Categories Active",
                                value: "18",
                                color: "bg-blue-500",
                            },
                            {
                                label: "Active Coupons",
                                value: "14",
                                color: "bg-orange-500",
                            },
                            {
                                label: "Running Banners",
                                value: "6",
                                color: "bg-purple-500",
                            },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                        {item.label}
                                    </span>

                                    <span className="text-sm text-muted-foreground">
                                        {item.value}
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className={`h-full w-full ${item.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}