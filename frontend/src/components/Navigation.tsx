"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./icons";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
      <nav
        className={
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 transition-all duration-300 ease-out gap-4 " +
          (scrolled
            ? "backdrop-blur-sm bg-bg shadow-sm py-2 md:py-4"
            : "bg-transparent py-8")
        }
    >
        <div className="text-text md:ml-50 transition-all duration-300 ease-out">
          <Logo className="w-48 h-12" />
        </div>


        <Link
          href="/create"
          className="flex items-center justify-center w-[115px] h-[45px] bg-accent text-center text-text px-8 py-3.5 rounded-4xl text-sm transition-all duration-300 group relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-accent/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
          />
          <span
            className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300"
          >
            Create
          </span>
          
          {/* Animated background effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-accent to-accent-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
        </Link>
    </nav>
  );
};