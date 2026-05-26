import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@shared/ui'

const heroContent = {
  tagline: 'Timeless Celebrations',
  title: 'Where Your Love Story Becomes a Masterpiece',
  description:
    'We craft bespoke wedding experiences that reflect your unique journey — every detail thoughtfully designed, every moment beautifully captured.',
  primaryCta: { text: 'Start Planning', link: '/contact' },
  secondaryCta: { text: 'View Our Work', link: '/portfolio' },
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll('.reveal').forEach((child, i) => {
              setTimeout(() => {
                (child as HTMLElement).style.transform = 'translateY(0)'
                ;(child as HTMLElement).style.opacity = '1'
              }, i * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-gradient-to-br from-cream via-cream to-sage/10"
    >
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_30%_50%,_#9CAF88_0%,_transparent_50%),radial-gradient(circle_at_70%_50%,_#C9A9A6_0%,_transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="pt-24 lg:pt-0">
            <span className="reveal inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-medium text-sage bg-sage/10 mb-6" style={{ transform: 'translateY(30px)', opacity: 0, transition: 'all 0.8s cubic-bezier(0.32,0.72,0,1)' }}>
              {heroContent.tagline}
            </span>

            <h1
              className="reveal text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-none text-espresso mb-6"
              style={{ transform: 'translateY(30px)', opacity: 0, transition: 'all 0.8s cubic-bezier(0.32,0.72,0,1)' }}
            >
              {heroContent.title}
            </h1>

            <p
              className="reveal text-lg text-espresso/60 leading-relaxed max-w-md mb-10"
              style={{ transform: 'translateY(30px)', opacity: 0, transition: 'all 0.8s cubic-bezier(0.32,0.72,0,1)' }}
            >
              {heroContent.description}
            </p>

            <div className="reveal flex flex-wrap gap-4" style={{ transform: 'translateY(30px)', opacity: 0, transition: 'all 0.8s cubic-bezier(0.32,0.72,0,1)' }}>
              <Link to={heroContent.primaryCta.link}>
                <Button variant="primary" size="lg" className="group">
                  {heroContent.primaryCta.text}
                  <span className="ml-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
              <Link to={heroContent.secondaryCta.link}>
                <Button variant="secondary" size="lg">
                  {heroContent.secondaryCta.text}
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-sage/20 to-dusty-rose/20 overflow-hidden">
              <div className="w-full h-full bg-[url('https://picsum.photos/seed/wedding-hero/800/1000')] bg-cover bg-center opacity-80" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-full bg-sage/10 blur-3xl" />
            <div className="absolute -top-6 -right-6 w-64 h-64 rounded-full bg-dusty-rose/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
