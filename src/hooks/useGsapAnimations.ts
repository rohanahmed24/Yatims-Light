'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Fade in from bottom animation on scroll
 */
export function useFadeInUp(options: {
  delay?: number
  duration?: number
  y?: number
} = {}) {
  const ref = useRef<HTMLElement>(null)
  
  const { delay = 0, duration = 0.8, y = 50 } = options

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none none', // Changed: Don't reverse
        },
      })
    })

    return () => ctx.revert()
  }, [delay, duration, y])

  return ref
}

/**
 * Staggered children animation
 */
export function useStaggerAnimation(options: {
  stagger?: number
  y?: number
  duration?: number
} = {}) {
  const ref = useRef<HTMLElement>(null)
  
  const { stagger = 0.15, y = 30, duration = 0.6 } = options

  useEffect(() => {
    if (!ref.current) return

    const children = ref.current.children

    const ctx = gsap.context(() => {
      gsap.from(children, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none', // Changed: Don't reverse
        },
      })
    })

    return () => ctx.revert()
  }, [stagger, y, duration])

  return ref
}

/**
 * Scale in animation
 */
export function useScaleIn(options: {
  scale?: number
  duration?: number
} = {}) {
  const ref = useRef<HTMLElement>(null)
  
  const { scale = 0.8, duration = 0.6 } = options

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scale,
        opacity: 0,
        duration,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none', // Changed: Don't reverse
        },
      })
    })

    return () => ctx.revert()
  }, [scale, duration])

  return ref
}

/**
 * Parallax effect for elements
 */
export function useParallax(speed: number = 50) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [speed])

  return ref
}

/**
 * Text reveal animation (split by words/chars)
 */
export function useTextReveal(options: {
  splitBy?: 'words' | 'chars'
  stagger?: number
} = {}) {
  const ref = useRef<HTMLElement>(null)
  
  const { splitBy = 'words', stagger = 0.03 } = options

  useEffect(() => {
    if (!ref.current) return

    const text = ref.current.textContent || ''
    const splitText = splitBy === 'words' ? text.split(' ') : text.split('')
    
    ref.current.innerHTML = splitText
      .map((item, i) => 
        `<span class="inline-block" style="opacity: 0;">${item}${splitBy === 'words' && i < splitText.length - 1 ? '&nbsp;' : ''}</span>`
      )
      .join('')

    const spans = ref.current.querySelectorAll('span')

    const ctx = gsap.context(() => {
      gsap.to(spans, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none', // Changed: Don't reverse
        },
      })
    })

    return () => ctx.revert()
  }, [splitBy, stagger])

  return ref
}

/**
 * Counter animation for numbers
 */
export function useCountUp(
  end: number,
  options: {
    duration?: number
    decimals?: number
  } = {}
) {
  const ref = useRef<HTMLElement>(null)
  
  const { duration = 2, decimals = 0 } = options

  useEffect(() => {
    if (!ref.current) return

    const obj = { val: 0 }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none', // Changed: Don't reverse
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = obj.val.toFixed(decimals)
          }
        },
      })
    })

    return () => ctx.revert()
  }, [end, duration, decimals])

  return ref
}
