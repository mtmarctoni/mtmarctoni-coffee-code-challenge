import React, { useMemo } from 'react'
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
    <div className="mt-6 flex justify-center">
      <div className="relative inline-flex items-center bg-accent3 rounded-full shadow-sm w-full max-w-[548px]">
        {/* sliding white indicator. Width and translate are computed from FILTERS.length so it's adaptive */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-0 bg-white rounded-full transition-transform duration-300 ease-in-out"
          style={{ width: `${100 / FILTERS.length}%`, transform: `translateX(${Math.max(0, activeIndex) * 100}%)` }}
        />

          <div className="flex flex-row z-10 justify-between relative w-full">
        {FILTERS.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={active}
              className={`text-center w-full py-3 text-sm font-medium transition-colors duration-150 focus:outline-none cursor-pointer ${
                active ? 'text-bg' : 'text-text'
              }`}
            >
              {f.label}
            </button>
          )
        })}
          </div>
      </div>
    </div>
  )
}
