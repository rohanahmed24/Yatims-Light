'use client'

import Link from 'next/link'
import { useFadeInUp } from '@/hooks/useGsapAnimations'

export function Footer() {
  const footerRef = useFadeInUp()

  return (
    <footer ref={footerRef as any} className="relative bg-navy-900 border-t border-navy-700 py-12">
      <div className="container">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/30">
              YL
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-slate-50 leading-none">
                Yatim's Light
              </span>
              <span className="text-xs text-slate-400 arabic-text leading-none">
                نور اليتيم
              </span>
            </div>
          </div>

          {/* Hadith Quote */}
          <div className="max-w-2xl mx-auto">
            <div className="card-glassy p-6 rounded-lg border border-primary-500/20">
              <p className="text-slate-300 italic mb-2">
                "Allah is in the aid of His servant as long as the servant is in the aid of his brother."
              </p>
              <p className="text-xs text-slate-500">— Hadith (Sahih Muslim)</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-400">
            <Link href="#home" className="hover:text-primary-300 transition-colors">
              Home
            </Link>
            <span>•</span>
            <Link href="#founder" className="hover:text-primary-300 transition-colors">
              About
            </Link>
            <span>•</span>
            <Link href="#stories" className="hover:text-primary-300 transition-colors">
              Stories
            </Link>
            <span>•</span>
            <Link href="#contact" className="hover:text-primary-300 transition-colors">
              Contact
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="max-w-xl mx-auto text-xs text-slate-500 space-y-2">
            <p>
              © {new Date().getFullYear()} Yatim's Light (نور اليتيم)
            </p>
            <p className="italic">
              This is a personal project of reminders, not a fundraising organization.
            </p>
          </div>

          {/* Made with love */}
          <div className="pt-6 border-t border-navy-800">
            <p className="text-xs text-slate-600 flex items-center justify-center gap-2">
              Made with <span className="text-red-500 animate-pulse">❤️</span> for the orphans of the Ummah
            </p>
          </div>
        </div>
      </div>

      {/* Gradient decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-50" />
    </footer>
  )
}
