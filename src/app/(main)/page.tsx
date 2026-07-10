"use client"
import Image from "next/image";
import { categoryImages } from "../../../assets/category icons/category images";
import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

export default function Home() {

  const lastScroll = useRef(0);
  const { isScrollDown, setIsScrollDown } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll.current + 15) {
        console.log("⬇️ Scrolling Down");
        setIsScrollDown(true);
      } else if (current < lastScroll.current) {
        console.log("⬆️ Scrolling Up");
        setIsScrollDown(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  return (
    <div className="border-4 h-auto flex items-center justify-center gap-3 flex-wrap pt-24">
      <section className="bg-red-600 border-2 ">
        lorem10000
      </section>
      <div className="flex flex-wrap items-center justify-center" >
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
  );
}
