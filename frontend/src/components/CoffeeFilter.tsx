import React, { useMemo } from 'react'

type Props = {
  filter: string
  setFilter: (f: string) => void
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'robusta', label: 'Robusta' },
  { key: 'arabica', label: 'Arabica' },
]

export function CoffeeFilter({ filter, setFilter }: Props) {
  const activeIndex = useMemo(() => FILTERS.findIndex((f) => f.key === filter), [filter])

  return (
    <div className="mt-6 flex justify-center">
      <div className="relative inline-flex items-center bg-accent3 rounded-full shadow-sm w-full max-w-[548px] ">
        {/* sliding white indicator. We assume equal-width segments so we use translateX by percentage */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-0 w-[calc(100%/3)] bg-white rounded-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${Math.max(0, activeIndex) * 100}%)` }}
        />

        {FILTERS.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={active}
              className={`flex-1 relative z-10 px-12 py-3 text-sm font-medium text-center transition-colors duration-150 focus:outline-none ${
                active ? 'text-bg' : 'text-text'
              }`}
            >
              {f.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
