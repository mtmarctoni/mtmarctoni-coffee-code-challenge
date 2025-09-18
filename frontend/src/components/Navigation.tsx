"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./icons";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // You can tweak the threshold (e.g. 8 or 12) for earlier/later transitions
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
      <nav
        className={
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:py-8 transition-all duration-300 ease-out gap-4 " +
          (scrolled
            ? "backdrop-blur-sm bg-bg shadow-sm py-2"
            : "bg-transparent py-8")
        }
    >
        <div className="text-text md:ml-50 transition-all duration-300 ease-out">
          <Logo className="w-48 h-12" />
        </div>

      <Link
        href="/create"
        className="flex items-center justify-center w-[115px] h-[45px] bg-accent text-center text-text px-8 py-3.5 rounded-4xl text-sm hover:bg-accent/50 transition-colors"
      >
   Create
      </Link>
    </nav>
  );
};