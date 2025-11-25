import type { Metadata } from 'next'
import { Inter, Noto_Sans_Arabic } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-sans-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Yatim's Light - A light of mercy for orphans",
  description: 'Inspiring hearts to remember and care for orphans in Bangladesh and beyond. Through stories, reflections, and reminders from Islamic teachings.',
  keywords: ['orphans', 'charity', 'Bangladesh', 'Islamic charity', 'yatim', 'sadaqah', 'mercy'],
  authors: [{ name: "Yatim's Light" }],
  openGraph: {
    title: "Yatim's Light - A light of mercy for orphans",
    description: 'Inspiring hearts to remember and care for orphans in Bangladesh and beyond.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansArabic.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster 
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#0F172A',
              border: '1px solid #334155',
              color: '#F8FAFC',
            },
          }}
        />
      </body>
    </html>
  )
}
