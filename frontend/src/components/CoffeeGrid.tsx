import React from 'react'
import { motion, Variants } from 'framer-motion'

import {Card} from '@/components/Card'
import { CoffeeItem } from '@/types/Item'

interface Props {
    items: CoffeeItem[]
}

// Animation variants for the grid container
const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        }
    }
}

// Animation variants for individual cards
const cardVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 30,
        scale: 0.95
    },
    visible: { 
        opacity: 1, 
        y: 0,
        scale: 1
    }
}

export const CoffeeGrid = ({ items }: Props) => {
    return (
        <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mx-0 sm:mx-8 md:mx-20 my-8 md:my-20"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
        >
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    variants={cardVariants}
                    transition={{ 
                        duration: 0.6,
                        ease: "easeOut",
                        delay: index * 0.1 
                    }}
                    whileHover={{ 
                        y: -8, 
                        scale: 1.02,
                        transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Card
                        title={item.title}
                        description={item.description ?? 'Free in the MVST office'}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        tag={item.category}
                    />
                </motion.div>
            ))}
        </motion.div>
    )
}