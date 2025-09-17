import './globals.css'

export const metadata = {
  title: 'MVST Coffee - Premium Roasted Coffee',
  description: 'Choose a quality cup and create your own with MVST Coffee',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-bg text-text`}>{children}</body>
    </html>
  )
}
