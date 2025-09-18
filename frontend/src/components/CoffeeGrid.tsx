import React from 'react'

import {Card} from '@/components/Card'
import { CoffeeItem } from '@/types/Item'

interface Props {
    items: CoffeeItem[]
}

export const CoffeeGrid = ({ items }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mx-0 sm:mx-8 md:mx-20 my-8 md:my-20">
            {items.map((item) => (
                <div key={item.id}>
                    <Card
                        title={item.title}
                        description={item.description ?? 'Free in the MVST office'}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        tag={item.category}
                    />
                </div>
            ))}
        </div>
    )
}