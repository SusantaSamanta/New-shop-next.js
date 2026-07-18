"use client";


import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { bannerImages } from "../../../../assets/bannerImages/BannerImages";



const BannerSlider = () => {
    return (
        <section className="w-full ">
            {/* <div className="mx-auto border-4"> */}
            <Carousel
                opts={{
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {bannerImages.map((banner, index) => (
                        <CarouselItem key={index}>
                            <div className="relative overflow-hidden rounded-2xl">
                                <div className="relative h-45 sm:h-70 md:h-60 lg:h-70 w-full select-none">
                                    <Image
                                        src={banner}
                                        alt={`Banner ${index + 1}`}
                                        fill
                                        priority={index === 0}
                                        className="object-cover bg-center"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/5 flex items-center">
                                        <div className="hidden px-8 md:px-22 text-white max-w-xl">
                                            <h1 className="text-2xl md:text-5xl font-bold">
                                                Fresh Vegetables
                                            </h1>

                                            <p className="mt-3 text-sm md:text-lg">
                                                Farm fresh groceries delivered to your doorstep.
                                            </p>

                                            <button className="mt-6 rounded-full bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition">
                                                Shop Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="left-5 hidden lg:flex" />
                <CarouselNext className="right-5 hidden lg:flex" />
            </Carousel>
            {/* </div> */}
        </section>
    );
};

export default BannerSlider;