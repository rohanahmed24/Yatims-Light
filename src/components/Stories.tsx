'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

const stories = [
  {
    name: 'Amina, 11',
    location: 'Sylhet, Bangladesh',
    quote: 'Now I want to become a teacher.',
    story:
      'Lost her mother at 8. A neighbor paid for her school fees. She graduated top of her class this year.',
    reminder: 'One act of generosity planted a seed of hope.',
    color: 'primary',
    image: '/images/amina.jpg', // Placeholder - need real image
  },
  {
    name: 'Rahim, 9',
    location: 'Dhaka slums',
    quote: 'Eid felt like my parents were still with me.',
    story:
      'A local mosque gave him new clothes and sweets on Eid. He cried—not from sadness, but from feeling remembered.',
    reminder: 'A small gesture can fill a huge void.',
    color: 'accent',
    image: '/images/rahim.jpg', // Placeholder - need real image
  },
  {
    name: 'Yusuf, 7',
    location: "Rohingya camp, Cox's Bazar",
    quote: 'He can walk again, alhamdulillah.',
    story:
      'Born with a leg deformity. A volunteer connected his case to a medical charity. Surgery changed his life.',
    reminder: "Your voice can be someone's miracle.",
    color: 'sky',
    image: '/images/yusuf.jpg', // Placeholder - need real image
  },
]

export function Stories() {
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

    const cards = cardsRef.current.children

    // Animate cards in with stagger
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        clearProps: 'all', // Clear inline styles after animation
      }
    )
  }, [isVisible])

  const getQuoteColor = (color: string) => {
    switch (color) {
      case 'primary':
        return 'text-primary-300 border-primary-500/30 bg-primary-500/5'
      case 'accent':
        return 'text-accent-300 border-accent-500/30 bg-accent-500/5'
      case 'sky':
        return 'text-sky-300 border-sky-500/30 bg-sky-500/5'
      default:
        return 'text-primary-300 border-primary-500/30 bg-primary-500/5'
    }
  }

  return (
    <section ref={sectionRef} id="stories" className="section py-20">
      <div className="container">
        <div className="text-center mb-12">
          <span className={`badge mb-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Stories
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-slate-50 ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}
          >
            Faces that remind us why it matters.
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stories.map((story, index) => (
            <div
              key={index}
              className="card-glassy rounded-lg overflow-hidden group hover:border-opacity-100 transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div className="relative aspect-[16/9] bg-navy-800 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-50">👤</span>
                </div>
                {/* Overlay text */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900 to-transparent p-4">
                  <p className="text-xs text-slate-400">{story.location}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Quote */}
                <div
                  className={`p-3 rounded-lg border-l-4 ${getQuoteColor(
                    story.color
                  )}`}
                >
                  <p className="text-sm font-medium italic">"{story.quote}"</p>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-slate-100">
                  {story.name}
                </h3>

                {/* Story */}
                <p className="text-sm text-slate-400 leading-relaxed">
                  {story.story}
                </p>

                {/* Reminder */}
                <div className="pt-4 border-t border-navy-700">
                  <p className="text-xs text-slate-500 italic flex items-start gap-2">
                    <span className="text-primary-500 flex-shrink-0">💡</span>
                    <span>{story.reminder}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <div className="card-glassy inline-block px-8 py-4 rounded-lg">
            <p className="text-slate-300 mb-3">
              These are just three stories. There are millions more waiting to be heard.
            </p>
            <p className="text-sm text-slate-500">
              Will you be the one who remembers them?
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
