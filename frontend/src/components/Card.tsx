import React from 'react'
import Image from 'next/image'

type Props = {
  title: string
  description?: string
  imageUrl?: string
  price?: number
  tag?: string
  isNew?: boolean
}

export const Card = ({
  title,
  description,
  imageUrl = '/latte.webp',
  price,
  tag,
}: Props) => {
  const colorTag = tag === 'robusta' ? 'bg-accent3' : tag === 'arabica' ? 'bg-accent2' : 'bg-gray-500';

  return (
  <article className="relative bg-bg-alt text-text rounded-md">
      {/* tag badge */}
      {tag && (
        <span className={`absolute left-4 top-4 ${colorTag} text-sm text-white px-3 py-2 rounded-full shadow`}>
          {tag}
        </span>
      )}

      <div className="flex flex-col items-center text-center p-6 md:p-10">
        {/* decorative image */}
        <div className="w-full md:max-w-xs aspect-square relative overflow-hidden rounded-lg">
        <Image 
          src={imageUrl}
          alt={title}
          fill
          sizes='250px'
          className="object-contain drop-shadow-xl"
          />
        </div>

        <div className="flex flex-col gap-2 h-24 mt-4">
          <h3 className="text-lg font-semibold text-accent-muted">{title}</h3>
          <p className="text-xs text-muted-alt">{description}</p>

          {typeof price === 'number' && (
            <span className="text-sm font-medium text-text">{price.toFixed(2)} €</span>
          )}
        </div>
      </div>
    </article>
  )
}
