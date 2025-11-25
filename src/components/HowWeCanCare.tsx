'use client'

import { useRef, useEffect, useState } from 'react'
import { BookOpen, Heart, Gift, Megaphone } from 'lucide-react'
import { gsap } from 'gsap'

const careCards = [
  {
    icon: BookOpen,
    title: 'Encourage Education',
    description: 'Support their learning. Even a small notebook or helping with homework can open doors for their future.',
    reminder: 'Education breaks cycles of poverty.',
    color: 'primary',
  },
  {
    icon: Heart,
    title: 'Be There in Hard Times',
    description: 'Check on them during illness, loss, or struggle. Your presence matters more than you think.',
    reminder: 'A kind word can heal invisible wounds.',
    color: 'primary',
  },
  {
    icon: Gift,
    title: 'Remember Them on Special Days',
    description: 'Orphans often feel the absence of parents most on Eid, birthdays, or celebrations. Include them.',
    reminder: 'Joy shared is joy multiplied.',
    color: 'accent',
  },
  {
    icon: Megaphone,
    title: 'Use Your Voice',
    description: 'Talk about orphans. Remind others of their struggles and rights. Awareness leads to action.',
    reminder: 'Speak for those who have no voice.',
    color: 'sky',
  },
]

export function HowWeCanCare() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || !cardsRef.current) return

    const cards = cardsRef.current.querySelectorAll('.care-card')

    // Animate cards in with stagger
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all', // Clear inline styles after animation
      }
    )

    // Setup hover animations
    cards.forEach((card) => {
      const icon = card.querySelector('.card-icon')
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' })
        gsap.to(icon, { scale: 1.15, rotate: 5, duration: 0.3, ease: 'back.out(2)' })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
        gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: 'back.out(2)' })
      })
    })
  }, [isVisible])

  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'text-primary-500 bg-primary-500/10 border-primary-500/30'
      case 'accent':
        return 'text-accent-500 bg-accent-500/10 border-accent-500/30'
      case 'sky':
        return 'text-sky-500 bg-sky-500/10 border-sky-500/30'
      default:
        return 'text-primary-500 bg-primary-500/10 border-primary-500/30'
    }
  }

  return (
    <section ref={sectionRef} id="care" className="section py-20 bg-navy-900/50">
      <div className="container">
        <div className="text-center mb-12">
          <span className={`badge mb-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            How We Can Care
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-slate-50 ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}
          >
            Practical ways to remember the yatim.
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {careCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div
                key={index}
                className="care-card card-glassy p-6 rounded-lg cursor-pointer transition-all duration-300 hover:border-opacity-100"
                style={{
                  borderColor:
                    card.color === 'primary'
                      ? 'rgba(16, 185, 129, 0.3)'
                      : card.color === 'accent'
                      ? 'rgba(251, 191, 36, 0.3)'
                      : 'rgba(14, 165, 233, 0.3)',
                }}
              >
                <div
                  className={`card-icon w-12 h-12 rounded-full flex items-center justify-center mb-4 border ${getColorClass(
                    card.color
                  )}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-100 mb-3">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {card.description}
                </p>

                <div className="pt-4 border-t border-navy-700">
                  <p className="text-xs text-slate-500 italic">
                    💭 {card.reminder}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom reminder */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 card-glassy px-6 py-3 rounded-full">
            <span className="text-sm text-slate-400">
              Small acts. Big impact. Every effort counts.
            </span>
            <span className="text-primary-500">✨</span>
          </div>
        </div>
      </div>
    </section>
  )
}
