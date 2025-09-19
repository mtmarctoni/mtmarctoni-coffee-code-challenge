"use client";

import { useEffect, useState } from 'react'
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

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="font-primary text-3xl md:text-5xl uppercase text-text">
          MVST. EXCLUSIVE COFFEE
        </h2>
        <CoffeeFilter filter={filter} setFilter={setFilter} />
      </div>
      <Toast message={errorMsg ?? "Unknown error"} isVisible={!!errorMsg} onClose={() => setErrorMsg(null)} type="warning" />
      <CoffeeGrid items={itemsToShow} />
      
    </main>
  )
}
