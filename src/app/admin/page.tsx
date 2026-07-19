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
    // {
    //     title: "Coupons",
    //     value: "14",
    //     change: "+4",
    //     positive: true,
    //     icon: TicketPercent,
    // },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-4">
            {/* Greeting */}
            <div className="rounded-2xl border bg-linear-to-r from-green-600 to-emerald-500 p-4 text-white">
                <h1 className="text-xl md:text-2xl font-bold">
                    Welcome back, Admin 👋
                </h1>

                <p className="text-sm  md:mt-1 text-green-100">
                    Manage your FreshNext grocery platform from one place.
                </p>
            </div>

            <section>
                <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                    {stats.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="rounded-2xl border bg-background p-3 md:p-4 transition hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="rounded-xl bg-primary/10 p-2 md:p-2">
                                        <Icon className="h-4 w-4 md:h-6 md:w-6 text-primary" />
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

                                <h2 className="mt-4 text-xl md:text-2xl font-bold">{item.value}</h2>

                                <p className="mt-0 text-sm text-muted-foreground">
                                    {item.title}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Quick Actions */}

            <section className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border bg-background p-4">
                    <h2 className="mb-4 text-lg font-semibold">
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-2 gap-2 md:gap-4">
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
                                className="rounded-xl border p-2 md:p-4 text-left transition hover:bg-muted"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Top Performing Stores */}

                <div className="rounded-2xl border bg-background p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">
                            Top Performing Stores
                        </h2>

                        <button className="text-sm text-primary hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="space-y-2">
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
                                className="flex items-center justify-between rounded-xl border p-2 hover:bg-muted/50 transition"
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

            <section className="grid gap-4 lg:grid-cols-2">
                {/* Top Selling Products */}

                <div className="rounded-2xl border bg-background p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            Top Selling Products
                        </h2>

                        <button className="text-sm text-primary hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="space-y-0 grid md:grid-cols-2 gap-2">
                        {[
                            {
                                name: "Fresh Apple",
                                sold: 1580,
                                revenue: "₹1.82L",
                            },
                            {
                                name: "Organic Milk",
                                sold: 1465,
                                revenue: "₹1.36L",
                            },
                            {
                                name: "Brown Bread",
                                sold: 1324,
                                revenue: "₹78K",
                            },
                            {
                                name: "Tomato",
                                sold: 1208,
                                revenue: "₹64K",
                            },
                            {
                                name: "Banana",
                                sold: 1160,
                                revenue: "₹58K",
                            },
                            {
                                name: "Potato",
                                sold: 1085,
                                revenue: "₹55K",
                            },
                            {
                                name: "Basmati Rice",
                                sold: 956,
                                revenue: "₹2.14L",
                            },
                            {
                                name: "Eggs (12 pcs)",
                                sold: 874,
                                revenue: "₹92K",
                            },
                        ].map((product, index) => (
                            <div
                                key={product.name}
                                className="flex items-center justify-between rounded-xl border p-2 md:p-3 transition hover:bg-muted/40"
                            >
                                <div className="flex items-center gap-3">
                                    {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                                        #{index + 1}
                                    </div> */}

                                    <div>
                                        <p className="font-medium">{product.name}</p>

                                        <p className="text-sm text-muted-foreground">
                                            {product.sold.toLocaleString()} Sold
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">{product.revenue}</p>

                                    <p className="text-xs text-green-600">
                                        Total Revenue
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Least Selling Products */}
                <div className="rounded-2xl border bg-background p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            Least Selling Products
                        </h2>

                        <button className="text-sm text-primary hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="space-y-0 grid md:grid-cols-2 gap-2">
                        {[
                            {
                                name: "Dragon Fruit",
                                sold: 18,
                                revenue: "₹3.6K",
                            },
                            {
                                name: "Kiwi",
                                sold: 24,
                                revenue: "₹5.2K",
                            },
                            {
                                name: "Broccoli",
                                sold: 31,
                                revenue: "₹2.9K",
                            },
                            {
                                name: "Olive Oil",
                                sold: 38,
                                revenue: "₹12.8K",
                            },
                            {
                                name: "Almond Milk",
                                sold: 42,
                                revenue: "₹8.7K",
                            },
                            {
                                name: "Quinoa",
                                sold: 47,
                                revenue: "₹10.4K",
                            },
                            {
                                name: "Avocado",
                                sold: 53,
                                revenue: "₹7.1K",
                            },
                            {
                                name: "Green Tea",
                                sold: 61,
                                revenue: "₹6.5K",
                            },
                        ].map((product, index) => (
                            <div
                                key={product.name}
                                className="flex items-center justify-between rounded-xl border p-2 md:p-3 transition hover:bg-muted/40"
                            >
                                <div className="flex items-center gap-3">
                                    {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                        #{index + 1}
                                    </div> */}

                                    <div>
                                        <p className="font-medium">{product.name}</p>

                                        <p className="text-sm text-muted-foreground">
                                            {product.sold} Sold
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">{product.revenue}</p>

                                    <p className="text-xs text-red-600">
                                        Low Demand
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            <section className="grid gap-4 lg:grid-cols-2">
                {/* Top Selling Products */}

                <div className="rounded-2xl border bg-background p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            Top Selling Products
                        </h2>

                        <button className="text-sm text-primary hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="space-y-0 grid md:grid-cols-2 gap-2">
                        {[
                            {
                                name: "Fresh Apple",
                                sold: 1580,
                                revenue: "₹1.82L",
                            },
                            {
                                name: "Organic Milk",
                                sold: 1465,
                                revenue: "₹1.36L",
                            },
                            {
                                name: "Brown Bread",
                                sold: 1324,
                                revenue: "₹78K",
                            },
                            {
                                name: "Tomato",
                                sold: 1208,
                                revenue: "₹64K",
                            },
                            {
                                name: "Banana",
                                sold: 1160,
                                revenue: "₹58K",
                            },
                            {
                                name: "Potato",
                                sold: 1085,
                                revenue: "₹55K",
                            },
                            {
                                name: "Basmati Rice",
                                sold: 956,
                                revenue: "₹2.14L",
                            },
                            {
                                name: "Eggs (12 pcs)",
                                sold: 874,
                                revenue: "₹92K",
                            },
                        ].map((product, index) => (
                            <div
                                key={product.name}
                                className="flex items-center justify-between rounded-xl border p-2 md:p-3 transition hover:bg-muted/40"
                            >
                                <div className="flex items-center gap-3">
                                    {/* <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                                        #{index + 1}
                                    </div> */}

                                    <div>
                                        <p className="font-medium">{product.name}</p>

                                        <p className="text-sm text-muted-foreground">
                                            {product.sold.toLocaleString()} Sold
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">{product.revenue}</p>

                                    <p className="text-xs text-green-600">
                                        Total Revenue
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform Status */}

                <div className="rounded-2xl border bg-background p-4">
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