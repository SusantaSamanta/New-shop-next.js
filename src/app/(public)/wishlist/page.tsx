"use client"

import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react";

type WishlistProduct = {
  id: string;
  name: string;
  unit: string;
  price: number;
  image: string;
};

const wishlistProducts: WishlistProduct[] = [
  {
    id: "1",
    name: "Apple",
    unit: "1 kg",
    price: 120,
    image: "https://picsum.photos/700",
  },
  {
    id: "2",
    name: "Banana",
    unit: "1 kg",
    price: 40,
    image: "https://picsum.photos/800",
  },
  {
    id: "3",
    name: "Amul Milk",
    unit: "1 L",
    price: 64,
    image: "https://picsum.photos/900",
  },
  {
    id: "4",
    name: "Broccoli",
    unit: "1 pc",
    price: 50,
    image: "https://picsum.photos/670",
  },
  {
    id: "5",
    name: "Tomato",
    unit: "1 kg",
    price: 30,
    image: "https://picsum.photos/760",
  },
  {
    id: "6",
    name: "Potato",
    unit: "1 kg",
    price: 28,
    image: "https://picsum.photos/730",
  },
  {
    id: "7",
    name: "Carrot",
    unit: "1 kg",
    price: 32,
    image: "https://picsum.photos/720",
  },
  {
    id: "8",
    name: "Daawat Rice",
    unit: "5 kg",
    price: 450,
    image: "https://picsum.photos/750",
  },
];

export default function WishlistPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen py-15 md:pt-20 md:pb-0">
      <div className="mx-auto w-full max-w-7xl space-y-4 md:space-y-6 pb-4 px-2 md:px-6">
        {/* Header */}
        <div className="md-4 mb-6 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-card text-gray-700 transition-colors hover:bg-gray-100"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Wishlist
                </h1>

                <Heart
                  className="h-5 w-5 fill-red-500 text-red-500"
                  strokeWidth={2}
                />
              </div>

              <p className="mt-0.5 text-sm text-gray-500">
                {wishlistProducts.length} saved items
              </p>
            </div>
          </div>

          <button
            type="button"
            className="hidden text-sm font-medium text-red-500 hover:text-red-600 sm:block"
          >
            Clear Wishlist
          </button>
        </div>

        {/* Product Grid */}
        {wishlistProducts.length > 0 ? (
          <section className="">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {wishlistProducts.map((product) => (
                <article
                  key={product.id}
                  className="group relative overflow-hidden rounded-xl border border-gray-100 bg-card p-2.5 transition-all duration-200  hover:border-emerald-200 hover:shadow-sm sm:p-3"
                >
                  {/* Remove */}
                  <button
                    type="button"
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors hover:text-red-500"
                  >
                    <Heart
                      className="h-4 w-4 fill-red-500 text-red-500"
                      strokeWidth={2}
                    />
                  </button>

                  {/* Product Image */}
                  <div className="flex h-36 items-center justify-center overflow-hidden rounded-lg bg-card sm:h-40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="mt-2">
                    <h2 className="truncate text-sm font-semibold text-gray-900">
                      {product.name}
                    </h2>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {product.unit}
                    </p>

                    <p className="mt-1 text-base font-bold text-gray-900">
                      ₹{product.price}
                    </p>

                    {/* Add to Cart */}
                    <button
                      type="button"
                      className="mt-2 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-50 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          /* Empty Wishlist */
          <section className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-5 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <Heart className="h-9 w-9 text-red-400" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mt-1 max-w-sm text-sm text-gray-500">
              Save your favorite products here and find them easily whenever
              you want to buy them.
            </p>

            <button
              type="button"
              className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Start Shopping
            </button>
          </section>
        )}

        {/* Mobile Clear Button */}
        {wishlistProducts.length > 0 && (
          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 dark:border-red-200/10 bg-white dark:bg-red-800/20 py-3 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 sm:hidden"
          >
            <Trash2 className="h-4 w-4" />
            Clear Wishlist
          </button>
        )}
      </div>
    </main>
  );
}