import Link from "next/link";
import {
    Bell,
    ChevronRight,
    CircleHelp,
    FileText,
    Heart,
    LockKeyhole,
    LogOut,
    MapPin,
    Moon,
    PackageCheck,
    PenLine,
    Phone,
    ShieldCheck,
    ShoppingCart,
} from "lucide-react";
import { profile_page_banner } from "../../../../assets/bannerImages/BannerImages";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*                              Types                                  */
/* ------------------------------------------------------------------ */

type Product = {
    id: string;
    name: string;
    unit: string;
    price: number;
    image: string;
};

type QuickLink = {
    key: string;
    title: string;
    description: string;
    icon: typeof PackageCheck;
    href?: string;
    /** Classes for the icon tile */
    iconWrap: string;
    /** Extra classes on the icon itself */
    iconClass?: string;
    /** Classes for the card */
    card: string;
};

type LinkRow = {
    key: string;
    label: string;
    icon: typeof Bell;
};

/* ------------------------------------------------------------------ */
/*                               Data                                  */
/* ------------------------------------------------------------------ */

const user = {
    name: "Susanta Samanta",
    firstName: "Susanta",
    email: "susantasamanta0708@gmail.com",
    phone: "+91 98765 43210",
    avatar: "https://picsum.photos/700",
    banner: "https://picsum.photos/700",
};

const recentlyViewed: Product[] = [
    {
        id: "1",
        name: "Apple",
        unit: "1 kg",
        price: 120,
        image: "https://picsum.photos/620",
    },
    {
        id: "2",
        name: "Banana",
        unit: "1 kg",
        price: 40,
        image: "https://picsum.photos/660",
    },
    {
        id: "3",
        name: "Amul Milk",
        unit: "1 L",
        price: 64,
        image: "https://picsum.photos/700",
    },
    {
        id: "4",
        name: "Tomato",
        unit: "1 kg",
        price: 30,
        image: "https://picsum.photos/800",
    },
    {
        id: "5",
        name: "Broccoli",
        unit: "1 pc",
        price: 50,
        image: "https://picsum.photos/500",
    },
    {
        id: "6",
        name: "Potato",
        unit: "1 kg",
        price: 28,
        image: "https://picsum.photos/300",
    },
    {
        id: "7",
        name: "Carrot",
        unit: "1 kg",
        price: 32,
        image: "https://picsum.photos/200",
    },
];

const suggestions: Product[] = [
    {
        id: "1",
        name: "Daawat Rice",
        unit: "5 kg",
        price: 450,
        image: "https://picsum.photos/600",
    },
    {
        id: "2",
        name: "Aashirvaad Atta",
        unit: "5 kg",
        price: 280,
        image: "https://picsum.photos/700",
    },
    {
        id: "3",
        name: "Amul Butter",
        unit: "500 g",
        price: 285,
        image: "https://picsum.photos/250",
    },
    {
        id: "4",
        name: "Tata Salt",
        unit: "1 kg",
        price: 26,
        image: "https://picsum.photos/500",
    },
    {
        id: "5",
        name: "Surf Excel",
        unit: "1 kg",
        price: 170,
        image: "https://picsum.photos/400",
    },
    {
        id: "6",
        name: "Nescafé Classic",
        unit: "100 g",
        price: 350,
        image: "https://picsum.photos/300",
    },
    {
        id: "7",
        name: "Lay's Classic",
        unit: "52 g",
        price: 20,
        image: "https://picsum.photos/200",
    },
];

const quickLinks: QuickLink[] = [
    {
        key: "orders",
        title: "Orders",
        description: "View and track your orders",
        icon: PackageCheck,
        iconWrap: "bg-orange-100 dark:bg-orange-200/10 text-orange-600",
        card: "border-orange-100 dark:border-orange-500/10 bg-orange-50/70 dark:bg-orange-700/10 hover:border-orange-200 hover:bg-orange-50",
    },
    {
        key: "wishlist",
        title: "Wishlist",
        description: "Your saved products",
        icon: Heart,
        href: "/wishlist",
        iconWrap: "bg-red-100 dark:bg-orange-200/10 text-red-500",
        iconClass: "fill-red-500",
        card: "border-red-100 dark:border-orange-500/10 bg-red-50/70 dark:bg-orange-800/10 hover:border-red-200 hover:bg-red-50",
    },
    {
        key: "addresses",
        title: "Saved Addresses",
        description: "Manage delivery addresses",
        icon: MapPin,
        iconWrap: "bg-blue-100 dark:bg-blue-200/10 text-blue-600",
        iconClass: "fill-blue-600 [&_circle]:fill-white dark:[&_circle]:fill-white/70",
        card: "border-blue-100 dark:border-blue-500/10 bg-blue-50/70 dark:bg-blue-500/10 hover:border-blue-200 hover:bg-blue-50",
    },
    {
        key: "cart",
        title: "Cart",
        description: "View your cart items",
        icon: ShoppingCart,
        iconWrap: "bg-green-100 dark:bg-green-500/10 text-green-600",
        iconClass: "fill-green-600",
        card: "border-green-100 dark:border-green-500/10 bg-green-50/70 dark:bg-green-500/10 hover:border-green-200 hover:bg-green-50",
    },
];

const accountLinks: LinkRow[] = [
    { key: "notifications", label: "Notification Settings", icon: Bell },
    { key: "password", label: "Change Password", icon: LockKeyhole },
    { key: "theme", label: "Theme", icon: Moon },
];

const supportLinks: LinkRow[] = [
    { key: "help", label: "Help Center", icon: CircleHelp },
    { key: "contact", label: "Contact Support", icon: Phone },
    { key: "terms", label: "Terms & Conditions", icon: FileText },
    { key: "privacy", label: "Privacy Policy", icon: ShieldCheck },
];

/* ------------------------------------------------------------------ */
/*                        Reusable pieces                             */
/* ------------------------------------------------------------------ */

function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group min-w-36.25 rounded-xl border border-gray-100 bg-card p-2.5 transition-all duration-200 hover:border-emerald-200 hover:shadow-sm sm:min-w-0">
            {/* Image */}
            <div className="flex h-30 items-center justify-center overflow-hidden rounded-lg bg-card sm:h-31.25">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Product info */}
            <div className="mt-2">
                <h3 className="truncate text-sm font-semibold text-gray-900">
                    {product.name}
                </h3>

                <p className="mt-0.5 text-xs text-gray-500">
                    {product.unit}
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">
                    ₹{product.price}
                </p>

                {/* Add button */}
                <button
                    type="button"
                    className="mt-2 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-50 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                >
                    <ShoppingCart className="h-4 w-4" />
                    Add
                </button>
            </div>
        </div>
    );
}

function ProductSection({
    title,
    subtitle,
    products,
}: {
    title: string;
    subtitle?: string;
    products: Product[];
}) {
    return (
        <section>
            {/* Header */}
            <div className="mb-4 flex items-end justify-between">
                <div className="min-w-0">
                    <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                        {title}
                    </h2>

                    {subtitle && (
                        <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                            {subtitle}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    className="group flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                >
                    See All
                    <ChevronRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                </button>
            </div>

            {/* Products */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 sm:overflow-visible">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

function QuickLinkCard({ link }: { link: QuickLink }) {
    const Icon = link.icon;

    const className = `group flex items-center gap-4 p-2 md:p-4 rounded-xl text-left transition-all duration-200 ${link.card}`;

    const content = (
        <>
            <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${link.iconWrap}`}
            >
                <Icon
                    className={`h-6 w-6 ${link.iconClass ?? ""}`}
                    strokeWidth={2}
                />
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-gray-900">
                    {link.title}
                </h3>

                <p className="mt-0.5 truncate text-xs text-gray-500">
                    {link.description}
                </p>
            </div>

            <ChevronRight className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1" />
        </>
    );

    // Cards with an href navigate, the rest stay inert until their pages exist
    if (!link.href) {
        return (
            <button
                type="button"
                className={className}
            >
                {content}
            </button>
        );
    }

    return (
        <Link
            href={link.href}
            className={className}
        >
            {content}
        </Link>
    );
}

function LinkRow({ row, isLast }: { row: LinkRow; isLast: boolean }) {
    const Icon = row.icon;

    return (
        <button
            type="button"
            className={`group flex w-full items-center gap-4 px-4 py-4 sm:px-5 text-left transition-colors hover:bg-gray-50/70 cursor-pointer  ${isLast ? "" : "border-b border-gray-100"
                }`}
        >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                <Icon className="h-5 w-5 text-gray-800" strokeWidth={2} />
            </div>

            <span className="flex-1 text-sm font-medium text-gray-800 sm:text-[15px]">
                {row.label}
            </span>

            <ChevronRight className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5" />
        </button>
    );
}

function LinkSection({ rows }: { rows: LinkRow[] }) {
    return (
        <section className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-card">
            {rows.map((row, index) => (
                <LinkRow
                    key={row.key}
                    row={row}
                    isLast={index === rows.length - 1}
                />
            ))}
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*                              Page                                   */
/* ------------------------------------------------------------------ */

export default function ProfilePage() {
    return (
        <div className="w-full h-auto flex items-center justify-center gap-3 flex-wrap py-15 md:pt-20 md:pb-0">
            <div className="w-full max-w-7xl space-y-4 md:space-y-6 px-2 md:px-6">
                {/* Profile header */}
                <section className="flex items-center justify-between gap-6 rounded-xl  p-4 sm:shadow-md overflow-hidden relative">
                    {/* User Info */}
                    <div className="grid grid-cols-[80px_1fr] gap-4 z-30">
                        {/* Profile Image */}
                        <div className="relative shrink-0 bg-card rounded-full">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-20 w-20 rounded-full object-cover"
                            />

                            <button
                                type="button"
                                className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-black text-white"
                            >
                                <PenLine className="h-3 w-3" />
                            </button>
                        </div>

                        {/* Details */}
                        <div className="truncate">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Hi, {user.firstName} 👋
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 truncate">
                                {user.email}
                            </p>

                            <p className="text-sm text-gray-500">
                                {user.phone}
                            </p>
                        </div>

                        <div className="w-65 md:col-start-2 flex gap-3 ">
                            <button
                                type="button"
                                className="flex gap-1 rounded-md border border-green-600 px-5 py-2 text-sm font-medium text-green-700 transition bg-card hover:bg-gray-50"
                            >
                                <PenLine size={15} /> Edit Profile
                            </button>

                            <button
                                type="button"
                                className="rounded-md border px-5 py-2 text-sm font-medium text-gray-700 transition bg-card hover:bg-gray-50"
                            >
                                Help Center
                            </button>
                        </div>
                    </div>

                    {/* Gradient color */}
                    <div className="hidden sm:block absolute z-20 left-0 h-full w-full md:w-13/14 bg-linear-to-r from-green-100 via-emerald-100  dark:from-green-900 dark:via-emerald-700 rounded-lg"></div>

                    {/* Banner Image */}
                    <div className="hidden sm:block absolute z-10 right-0 xl:block h-full w-200 overflow-hidden rounded-lg">
                        <Image
                            src={profile_page_banner || ""}
                            alt="FreshNext groceries"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </section>

                {/* Quick links */}
                <section className="w-full">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {quickLinks.map((link) => (
                            <QuickLinkCard key={link.key} link={link} />
                        ))}
                    </div>
                </section>

                {/* Recently viewed */}
                <ProductSection
                    title="Recently Viewed"
                    products={recentlyViewed}
                />

                {/* Suggestions */}
                <ProductSection
                    title="Suggestions for You"
                    subtitle="Based on your recent activity"
                    products={suggestions}
                />

                {/* Account settings */}
                <LinkSection rows={accountLinks} />

                {/* Support & legal */}
                <section className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-card">
                    <LinkSection rows={supportLinks} />

                    {/* Logout */}
                    <div className="p-3 sm:p-4">
                        <button
                            type="button"
                            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-100 dark:border-red-700/10 bg-white dark:bg-red-800/10 text-sm font-semibold text-red-500 transition-all hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-800/20 cursor-pointer"
                        >
                            <LogOut className="h-5 w-5" strokeWidth={2} />
                            Logout
                        </button>
                    </div>
                </section>

                {/* Mobile gradient */}
                <div className="sm:hidden absolute z-20 left-0 top-0  h-1/3 w-full bg-linear-to-b from-green-50 via-green-50 dark:from-green-800/20 dark:via-green-800/10 "></div>
            </div>
        </div>
    );
}


/// End     

