/**
 * MainSection component
 * Usage: import MainSection from '@/components/MainSection' and add to `page.tsx`.
 */
import React, { useState, useEffect } from 'react'
import { CoffeeItem } from '@/types/Item'
import { CoffeeGrid } from '@/components/CoffeeGrid'
import { CoffeeFilter } from '@/components/CoffeeFilter'
import { fetchItems, createCoffee } from '@/services/coffeeApi'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'robusta', label: 'Robusta' },
  { key: 'arabica', label: 'Arabica' },
]

export function MainSection() {
  const [filter, setFilter] = useState<string>('all')
  const [items, setItems] = useState<CoffeeItem[]>([])

  useEffect(() => {
    fetchItems()
      .then(setItems)
      .catch((err) => console.error('Fetch coffees failed', err))
  }, [])

  const itemsToShow: CoffeeItem[] =
    filter === 'all' ? items : items.filter((c) => c.category === filter)

  // form state


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
