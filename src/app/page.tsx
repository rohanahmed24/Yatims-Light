'use client'

import { useEffect } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { FounderStory } from '@/components/FounderStory'
import { HowWeCanCare } from '@/components/HowWeCanCare'
import { Stories } from '@/components/Stories'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  // Initialize Lenis smooth scroll with GSAP
  useSmoothScroll()

  useEffect(() => {
    // Prevent FOUC (Flash of Unstyled Content)
    document.body.style.opacity = '1'
  }, [])

  return (
    <main className="min-h-screen bg-navy text-slate-300">
      <Header />
      <Hero />
      <FounderStory />
      <HowWeCanCare />
      <Stories />
      <Contact />
      <Footer />
    </main>
  )
}
