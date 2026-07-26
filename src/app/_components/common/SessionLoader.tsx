"use client";

import { Loader2, ShoppingBasket } from "lucide-react";
import Loader from "./Loader";

export default function SessionLoader() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary shadow-xl">
          <ShoppingBasket className="h-10 w-10 text-primary-foreground" />
        </div>

       <Loader/>

        {/* Text */}
        <h2 className="text-xl font-semibold tracking-tight">
          Preparing your experience
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Please wait while we verify your session...
        </p>

        {/* Progress */}
        <div className="mt-8 h-1 w-64 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/3 animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes loading {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(420%);
          }
        }
      `}</style>
    </div>
  );
}