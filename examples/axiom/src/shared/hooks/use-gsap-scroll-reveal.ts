import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type RevealType = 'fade-up' | 'scale-in' | 'line-draw'

interface ScrollRevealOptions {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  trigger?: string | Element
  markers?: boolean
  type?: RevealType
}

const CINEMATIC_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)'

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null!)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1, clearProps: 'all' })
      return
    }

    const type = options.type || 'fade-up'

    if (type === 'fade-up') {
      gsap.fromTo(el,
        { opacity: 0, y: 48, ...options.from },
        {
          opacity: 1, y: 0,
          duration: 1.1,
          ease: CINEMATIC_EASE,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
            markers: options.markers,
          },
          ...options.to,
        }
      )
    } else if (type === 'scale-in') {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.95, y: 24, ...options.from },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1.2,
          ease: CINEMATIC_EASE,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          ...options.to,
        }
      )
    } else if (type === 'line-draw') {
      gsap.fromTo(el,
        { scaleX: 0, transformOrigin: 'left center', ...options.from },
        {
          scaleX: 1,
          duration: 1.5,
          ease: CINEMATIC_EASE,
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          ...options.to,
        }
      )
    }
  })

  return ref
}
