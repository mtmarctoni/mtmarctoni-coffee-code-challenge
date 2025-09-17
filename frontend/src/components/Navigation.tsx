import { useEffect, useState } from "react";

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
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 md:py-6 transition-all duration-300 ease-out " +
          (scrolled
            ? "backdrop-blur-sm bg-bg shadow-sm"
            : "bg-transparent")
        }
      >
        <div className="text-text font-bold text-xl">
          MVST Coffee
        </div>

        <button className="bg-accent text-text px-5 py-2 rounded-full text-sm hover:bg-accent/50 transition-colors">
          Contact
        </button>
      </nav>
  );
};