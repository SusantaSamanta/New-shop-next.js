import Link from "next/link";
import Image from "next/image";
import { categories } from "../../../../assets/category icons/category images";
import { collections } from "../../../../assets/Collections categories";


const CategoryPage = () => {
    return (
        <>
            {/* Category Section */}
            <section>
                <h1 className="mb-4 text-lg md:text-xl font-bold">
                    Shop by Category
                </h1>

                <div className="grid grid-cols-3 gap-2 md:gap-3 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8">
                    {categories.map((category) => (
                        <Link
                            key={category.value}
                            href={`/category/${category.value}`}
                            className="group rounded-2xl border bg-white p-2 transition hover:border-green-500 hover:shadow-lg dark:bg-background"
                        >
                            <div className="flex flex-col items-center">
                                <Image
                                    src={category.icon}
                                    alt={category.label}
                                    className="w-14 h-10 md:w-14 md:h-14 object-contain transition duration-300 group-hover:scale-105"
                                />

                                <h2 className="text-center text-sm font-semibold">
                                    {category.label}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            {/* Collection Section */}
            <section className="mt-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg md:text-xl font-bold">
                        Shop by Collection
                    </h2>
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-3 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8">
                    {collections.map((item) => (
                        <Link
                            key={item.value}
                            href={`/category/collection/${item.value}`}
                            className="group rounded-2xl border p-2 bg-white dark:bg-background transition hover:border-green-500 hover:shadow-md"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <item.icon
                                    className="w-8 h-8 md:w-10 md:h-10 text-green-600 transition group-hover:scale-110"
                                />

                                <h2 className="text-sm text-center font-semibold">
                                    {item.label}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
};

export default CategoryPage;