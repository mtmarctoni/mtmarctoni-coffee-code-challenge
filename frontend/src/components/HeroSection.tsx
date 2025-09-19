"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 }
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <section className="bg-[url('/hero-img.webp')] bg-cover bg-center bg-no-repeat text-text relative min-h-screen overflow-hidden">
      {/* Animated overlay with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-black/65"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1.5 }}
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      <div className="relative z-10 flex flex-col md:items-start items-center justify-center px-6 py-16 min-h-[calc(100vh-100px)]">
        <div className="max-w-2xl px-25 md:px-0 md:ml-50 text-center md:text-left">
          <motion.h1 
            className="font-primary text-[64px] md:text-[130px] mb-6 leading-none"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.2, delay: 0.2 }}
            whileInView="visible"
            viewport={{ once: true }}
          >
              ROASTED COFFEE
            
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 text-xl mb-8 w-full"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.8 }}
            whileInView="visible"
            viewport={{ once: true }}
          >
            Choose a coffee from below or create your own.
          </motion.p>
          
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 1.2 }}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/create"
              className="bg-accent text-text px-6 py-3 rounded-full text-sm hover:bg-accent/80 hover:scale-110 hover:shadow-lg/50 hover:shadow-accent hover:border border-text/50 transition-all duration-300 items-center whitespace-nowrap"
            >
                Choose your own coffee
           
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
