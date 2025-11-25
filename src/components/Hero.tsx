'use client'

import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main heading animation - split text
      if (headingRef.current) {
        const text = headingRef.current.textContent || ''
        const words = text.split(' ')
        headingRef.current.innerHTML = words
          .map((word) => `<span class="inline-block opacity-0">${word}&nbsp;</span>`)
          .join('')

        gsap.to(headingRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.5,
        })
      }

      // Quote card animations
      gsap.from('.quote-card', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 1,
      })

      // Video placeholder animation
      gsap.from('.video-placeholder', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'back.out(1.4)',
        delay: 1.2,
      })

      // Info cards stagger
      gsap.from('.info-card', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 1.5,
      })

      // Gradient orbs parallax
      gsap.to('.gradient-orb-1', {
        y: -50,
        x: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to('.gradient-orb-2', {
        y: -80,
        x: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen pt-24 pb-16 overflow-hidden"
    >
      {/* Animated gradient backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-orb-1 absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="gradient-orb-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1
              ref={headingRef}
              className="text-4xl lg:text-5xl font-bold text-slate-50 leading-tight"
            >
              Be the light that reaches an orphan's heart before the night does.
            </h1>

            <p
              ref={quoteRef}
              className="text-lg text-slate-400 italic border-l-4 border-primary-500 pl-4"
            >
              "And they give food, in spite of love for it, to the needy, the orphan, and the captive."
              <span className="block mt-2 text-sm text-slate-500">
                — Qur'an 76:8
              </span>
            </p>

            {/* Quote Cards */}
            <div className="space-y-4">
              <div className="quote-card card-glassy p-6 rounded-lg">
                <p className="arabic-text text-xl text-primary-300 mb-2">
                  وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ
                </p>
                <p className="text-sm text-slate-400">
                  "Allah is in the aid of His servant as long as the servant is in the aid of his brother."
                </p>
              </div>

              <div className="quote-card card-glassy p-6 rounded-lg">
                <p className="arabic-text text-xl text-accent-400 mb-2">
                  أَنَا وَكَافِلُ الْيَتِيمِ فِي الْجَنَّةِ هَكَذَا
                </p>
                <p className="text-sm text-slate-400">
                  "I and the one who looks after an orphan will be like this in Paradise." (Showing his two fingers)
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Hero Video */}
            <div className="video-placeholder relative aspect-video bg-navy-800 rounded-xl overflow-hidden border border-navy-700">
              {/* Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls={isPlaying}
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/videos/Islamic_Orphan_Video_Created.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Custom Play Button Overlay (shows before playing) */}
              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-accent-500/20 cursor-pointer group"
                  onClick={handlePlayVideo}
                >
                  <div className="w-16 h-16 rounded-full bg-primary-500/90 flex items-center justify-center group-hover:bg-primary-600 transition-all group-hover:scale-110 duration-300 shadow-lg">
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </div>
                </div>
              )}
              
              {/* Video caption (shows when not playing) */}
              {!isPlaying && (
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <div className="bg-navy-900/80 backdrop-blur-sm p-3 rounded-lg">
                    <p className="text-sm text-slate-300">
                      Watch: Stories that move hearts
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="info-card card-glassy p-4 rounded-lg text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xs font-bold text-slate-200 mb-1">
                  Intention/Inspire
                </h3>
                <p className="text-xs text-slate-400">
                  Awaken hearts
                </p>
              </div>

              <div className="info-card card-glassy p-4 rounded-lg text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <span className="text-2xl">📖</span>
                </div>
                <h3 className="text-xs font-bold text-slate-200 mb-1">
                  Reminders/Stories
                </h3>
                <p className="text-xs text-slate-400">
                  Through words
                </p>
              </div>

              <div className="info-card card-glassy p-4 rounded-lg text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-sky-500/20 flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xs font-bold text-slate-200 mb-1">
                  Ummah/Worldwide
                </h3>
                <p className="text-xs text-slate-400">
                  Global reach
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
