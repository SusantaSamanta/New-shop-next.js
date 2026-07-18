"use client"
import Image from "next/image";
import { categoryImages } from "../../../assets/category icons/category images";
import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import BannerSlider from "../_components/home/BannerSlider";
import ShopByCategory from "../_components/home/ShopByCategory";

export default function Home() {

  const lastScroll = useRef(0);
  const { isScrollDown, setIsScrollDown } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll.current + 15) {
        console.log("first")
        setIsScrollDown(true);
      } else if (current < lastScroll.current) {
        setIsScrollDown(false);
      }
      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  return (
    <div className="w-full h-auto flex items-center justify-center gap-3 flex-wrap pt-16 md:pt-20 ">
      <div className="w-full max-w-7xl space-y-4 md:space-y-8 px-2 md:px-6 border">
        <section className="w-full flex justify-center rounded-2xl overflow-hidden">
          <BannerSlider />
        </section>
        <section>
          <ShopByCategory/>
        </section>


        <div className="mt-50 flex flex-wrap items-center justify-center" >
          <Image
            src={categoryImages.vegetables}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.fish}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.meat_chicken}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.milk_dairy}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.vegetables}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.fish}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.meat_chicken}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.milk_dairy}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.vegetables}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.fish}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.meat_chicken}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.milk_dairy}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.vegetables}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.fish}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.meat_chicken}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.milk_dairy}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.vegetables}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.fish}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.meat_chicken}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.milk_dairy}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.vegetables}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.fish}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.meat_chicken}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.milk_dairy}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.vegetables}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.fish}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.meat_chicken}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src={categoryImages.milk_dairy}
            alt="hi"
            width={100}
            height={100}
            className="rounded-md"
          />
        </div>

      </div>

    </div>
  );
}
