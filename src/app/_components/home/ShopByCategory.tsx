"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { categories } from "../../../../assets/category icons/category images";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ShopByCategory = () => {
  return (
    <section className="mx-auto lg:px-2 select-none">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Shop by Category</h2>

        <Link
          href="/category"
          className="text-green-600 font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      <Carousel
        opts={{
          align: "start",
          dragFree: false,
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-1/4 sm:basis-1/6 md:basis-1/8 lg:basis-1/10 xl:basis-1/12"
            >
              <Link
              key={category.value}
                href={`/category/${category.value}`}
                className="flex flex-col items-center rounded-xl border bg-background p-1 shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-8 w-8 md:h-10  md:w-10">
                  <Image
                    src={category.icon}
                    alt={category.label}
                    className="object-contain"
                  />
                </div>

                <p className=" text-center text-xs  font-medium">
                  {category.label.length >= 12 }
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-8 hidden lg:flex" />
        <CarouselNext className="-right-8 hidden lg:flex" />
      </Carousel>
    </section>
  );
};

export default ShopByCategory;