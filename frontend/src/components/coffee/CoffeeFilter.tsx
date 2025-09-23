"use client";

import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CoffeeCategoryType, FilterType } from '@/types/Item'
import { CoffeeCategory } from '@/types/Item'

type Props = {
  filter: FilterType
  setFilter: (f: FilterType) => void
}

// Build filters from the Zod enum so adding categories is automatic
const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  ...Object.values(CoffeeCategory).map((k) => ({ key: k as CoffeeCategoryType, label: k.charAt(0).toUpperCase() + k.slice(1) })),
]

export function CoffeeFilter({ filter, setFilter }: Props) {
  const activeIndex = useMemo(() => FILTERS.findIndex((f) => f.key === filter), [filter])

  return (
    <motion.div 
      className="mt-6 flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.div 
        className="relative inline-flex items-center bg-accent3 rounded-full shadow-sm w-full max-w-[548px]"
        whileHover={{ 
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Enhanced sliding indicator with smooth animations */}
        <motion.div
          className="absolute top-0 bottom-0 left-0 bg-white rounded-full shadow-lg"
          initial={false}
          animate={{
            width: `${100 / FILTERS.length}%`,
            x: `${Math.max(0, activeIndex) * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          }}
        />

        <div className="flex flex-row z-10 justify-between relative w-full">
          {FILTERS.map((f, index) => {
            const active = filter === f.key
            return (
              <motion.button
                key={f.key}
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`text-center w-full py-3 text-sm font-medium focus:outline-none cursor-pointer relative ${
                  active ? 'text-bg' : 'text-text'
                }`}
                whileTap={{ 
                  scale: 0.95,
                  y: 0
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="relative z-10"
                  animate={{
                    color: active ? '#101011' : '#FFFFFF',
                    fontWeight: active ? 600 : 500
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {f.label}
                </motion.span>
                
                {/* Ripple effect on click */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
