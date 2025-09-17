/**
 * MainSection component
 * Usage: import MainSection from '@/components/MainSection' and add to `page.tsx`.
 */
import React, { useState } from 'react'
import { coffeeItems } from '@/data/sampleData'
import { CoffeeItem } from '@/types/Item'
import { CoffeeGrid } from '@/components/CoffeeGrid'
import { CoffeeFilter } from '@/components/CoffeeFilter'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'robusta', label: 'Robusta' },
  { key: 'arabica', label: 'Arabica' },
]

export function MainSection() {
  const [filter, setFilter] = useState<string>('all')

  const itemsToShow: CoffeeItem[] =
    filter === 'all'
      ? coffeeItems
      : coffeeItems.filter((c) => c.category === filter)

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="font-primary text-5xl uppercase text-text">
          MVST. EXCLUSIVE COFFEE
        </h2>
        <CoffeeFilter filter={filter} setFilter={setFilter} />
      </div>
          
      <CoffeeGrid items={itemsToShow} />

      
    </main>
  )
}
