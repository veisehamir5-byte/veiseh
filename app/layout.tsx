import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Veiseh Finder - جستجوی تجهیزات سنگین',
  description: 'داشبورد جستجوی قیمت تجهیزات سنگین و ماشین‌های ساختمانی',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#1A2F5A',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1A2F5A" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-gray-50">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
