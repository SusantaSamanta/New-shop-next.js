"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/app/_components/Header";
import MobileBottomNav from "@/app/_components/MobileBottomNav";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <Header />
      <MobileBottomNav />
      {children}
    </NextThemesProvider>
  );
}

