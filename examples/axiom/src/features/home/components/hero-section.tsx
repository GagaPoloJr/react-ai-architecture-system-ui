import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MagneticLink } from '@shared/ui/magnetic-link'
import type { HeroContent } from '../types'

interface HeroSectionProps {
  content?: HeroContent
}

const heroData: HeroContent = {
  headline: 'We build things that matter.',
  description: 'Axiom is a strategy, design, and engineering partner for organizations navigating complexity.',
  primaryCta: 'Get in touch',
  secondaryCta: 'View our work',
}

export function HeroSection({ content = heroData }: HeroSectionProps) {
  const container = useRef<HTMLDivElement>(null!)
  const descRef = useRef<HTMLParagraphElement>(null!)
  const ctaRef = useRef<HTMLDivElement>(null!)
  const imageRef = useRef<HTMLImageElement>(null!)

  const words = content.headline.split(' ')

  useGSAP(() => {
    const wordEls = container.current.querySelectorAll('.hero-word')
    gsap.fromTo(wordEls,
      { opacity: 0, y: 40, rotateX: -15 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
      }
    )
    gsap.fromTo(descRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1, ease: 'cubic-bezier(0.65, 0, 0.35, 1)', delay: 0.6 }
    )
    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'cubic-bezier(0.65, 0, 0.35, 1)', delay: 0.9 }
    )
    gsap.to(imageRef.current, {
      y: '8%',
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, { scope: container })

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-canvas grain">
      <div className="absolute inset-0 -z-10">
        <img
          ref={imageRef}
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ willChange: 'transform' }}
        />
        <div className="absolute inset-0 bg-text-primary/30" />
      </div>
      <div ref={container} className="max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36 lg:py-44">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-text-primary leading-tight max-w-5xl">
          {words.map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h1>
        <p
          ref={descRef}
          className="mt-8 text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
          style={{ willChange: 'transform, opacity' }}
        >
          {content.description}
        </p>
        <div ref={ctaRef} className="mt-10 flex gap-8" style={{ willChange: 'transform, opacity' }}>
          <MagneticLink href="/contact" className="text-text-primary border-b border-text-primary/30 pb-0.5 hover:border-text-primary transition-colors text-sm tracking-widest uppercase inline-block">
            {content.primaryCta}
          </MagneticLink>
          <a href="/portfolio" className="text-text-secondary border-b border-border pb-0.5 hover:text-text-primary hover:border-text-primary/30 transition-colors text-sm tracking-widest uppercase inline-block">
            {content.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  )
}
