'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: "Founder's Story", href: '#founder' },
  { name: 'How We Can Care', href: '#care' },
  { name: 'Stories', href: '#stories' },
  { name: 'Zakat Reflection', href: '#zakat' },
  { name: 'Reminders', href: '#reminders' },
  { name: 'Reach Out', href: '#contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate header on mount
  useEffect(() => {
    gsap.from('.header-logo', {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.from('.header-nav-item', {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.3,
    })

    gsap.from('.header-cta', {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'back.out(1.7)',
      delay: 0.8,
    })
  }, [])

  // Smooth scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-navy-900/95 backdrop-blur-md border-b border-navy-700 py-3'
            : 'bg-transparent py-4'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="#home" 
              className="header-logo flex items-center gap-3 group"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow">
                YL
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-50 leading-none">
                  Yatim's Light
                </span>
                <span className="text-xs text-slate-400 arabic-text leading-none">
                  نور اليتيم
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="header-nav-item px-3 py-2 text-sm text-slate-300 hover:text-primary-300 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <button className="header-cta hidden lg:block btn btn-primary">
              Be Inspired to Care
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-primary-300 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="absolute top-20 right-4 left-4 bg-navy-900 border border-navy-700 rounded-lg p-6 shadow-xl">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-3 text-slate-300 hover:text-primary-300 transition-colors border-b border-navy-700 last:border-0"
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full mt-4 btn btn-primary">
              Be Inspired to Care
            </button>
          </nav>
        </div>
      )}
    </>
  )
}
