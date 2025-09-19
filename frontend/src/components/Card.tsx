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
  imageUrl = '/custom.webp',
  price,
  tag,
}: Props) => {
  const colorTag = tag === 'robusta' ? 'bg-accent3' : tag === 'arabica' ? 'bg-accent2' : 'bg-accent-muted';

  return (
  <article 
    className="relative bg-bg-alt text-text rounded-md overflow-hidden group cursor-pointer"
  >
      {/* tag badge */}
      {tag && (
        <span 
          className={`absolute left-4 top-4 ${colorTag} text-sm text-white px-3 py-2 rounded-full shadow z-10 animate-badge`}
        >
          {tag}
        </span>
      )}

      <div className="flex flex-col items-center text-center p-6 md:p-10">
        {/* decorative image */}
        <div 
          className="w-full md:max-w-xs aspect-square relative overflow rounded-lg"
        >
        <Image 
          src={imageUrl}
          alt={title}
          fill
          sizes='250px'
          className="object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div 
          className="flex flex-col gap-2 h-24 mt-4 animate-content"
        >
          <h3 
            className="text-lg font-semibold text-accent-muted group-hover:text-accent transition-colors duration-300"
          >
            {title}
          </h3>
          <p className="text-xs text-muted-alt">{description}</p>

          {typeof price === 'number' && (
            <span 
              className="text-sm font-medium text-text group-hover:scale-110 transition-transform duration-200"
            >
              {price.toFixed(2)} €
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
