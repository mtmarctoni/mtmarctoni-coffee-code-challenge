"use client";

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FilterType, CoffeeItem } from '@/types/Item'
import { CoffeeGrid } from '@/components/CoffeeGrid'
import { CoffeeFilter } from '@/components/CoffeeFilter'
import Toast from '@/components/Toast';

interface Props {
  items: CoffeeItem[];
  error: string | null;
}

export function MainSection({ items, error }: Props) {
  const [filter, setFilter] = useState<FilterType>('all')
  const [errorMsg, setErrorMsg] = useState<string | null>(error);

  useEffect(() => {
    setErrorMsg(error);
  }, [error]);

  const itemsToShow: CoffeeItem[] =
    filter === 'all' ? items : items.filter((c) => c.category === filter)

  // Animation variants for the title
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main 
      className="max-w-6xl mx-auto px-6 py-12"
    >
      <div className="flex flex-col gap-4 text-center">
        <motion.h2 
          className="font-primary text-3xl md:text-5xl uppercase text-text hover:scale-110 hover:text-accent hover:drop-shadow-2xl shadow-accent transition-all duration-300"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          MVST. EXCLUSIVE COFFEE
        </motion.h2>
        <CoffeeFilter filter={filter} setFilter={setFilter} />
      </div>
      
      <Toast message={errorMsg ?? "Unknown error"} isVisible={!!errorMsg} onClose={() => setErrorMsg(null)} type="warning" />
      
      {/* Animate grid with filter changes */}
      <motion.div
        key={filter} // This will trigger re-animation when filter changes
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <CoffeeGrid items={itemsToShow} />
      </motion.div>
    </main>
  )
}
