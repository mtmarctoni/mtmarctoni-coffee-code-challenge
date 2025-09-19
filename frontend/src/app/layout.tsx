import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'MVST Coffee - Premium Coffee',
    template: '%s | MVST Coffee',
  },
  description: 'Choose a quality cup and create your own with MVST Coffee. Discover our exclusive collection of premium coffee from arabica and robusta beans.',
  keywords: ['coffee', 'roasted coffee', 'arabica', 'robusta', 'premium coffee', 'MVST', 'espresso', 'latte', 'cappuccino'],
  authors: [{ name: 'MVST Coffee' }, { name: 'mtmarctoni' }],
  creator: 'MVST Coffee',
  publisher: 'MVST Coffee',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MVST Coffee - Premium Roasted Coffee',
    description: 'Choose a quality cup and create your own with MVST Coffee. Discover our exclusive collection of premium roasted coffee.',
    url: '/',
    siteName: 'MVST Coffee',
    images: [
      {
        url: '/hero-img.webp',
        width: 1200,
        height: 630,
        alt: 'MVST Coffee - Premium Roasted Coffee Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MVST Coffee - Premium Coffee',
    description: 'Choose a quality cup and create your own with MVST Coffee. Discover our exclusive collection of premium coffee.',
    images: ['/hero-img.webp'],
    creator: '@mvstcoffee',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "MVST Coffee",
              "description": "Premium roasted coffee shop offering exclusive arabica and robusta coffee blends",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              "telephone": "+1-234-567-8900",
              "priceRange": "€€",
              "servesCuisine": "Coffee",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Coffee Street",
                "addressLocality": "Coffee City",
                "addressRegion": "Coffee State",
                "postalCode": "12345",
                "addressCountry": "US"
              },
              "openingHours": [
                "Mo-Fr 07:00-18:00",
                "Sa-Su 08:00-16:00"
              ],
              "sameAs": [
                "https://facebook.com/mvstcoffee",
                "https://instagram.com/mvstcoffee",
                "https://twitter.com/mvstcoffee"
              ]
            })
          }}
        />
      </head>
      <body className={`bg-bg text-text`}>{children}</body>
    </html>
  )
}
