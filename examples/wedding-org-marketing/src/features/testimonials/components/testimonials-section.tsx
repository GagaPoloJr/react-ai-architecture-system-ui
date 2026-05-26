import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import type { Testimonial } from '../types'

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Serenity turned our vision into a reality that exceeded every expectation. Every detail was thoughtful, every moment perfectly orchestrated. We felt truly celebrated.',
    author: 'Margaret Chen',
    role: 'Bride',
    weddingDate: 'May 2025',
    rating: 5,
  },
  {
    id: '2',
    quote: 'From our first consultation to the last dance, the team was incredible. They anticipated every need and handled every surprise with grace. Worth every penny.',
    author: 'Sarah & David Kim',
    role: 'Newlyweds',
    weddingDate: 'March 2025',
    rating: 5,
  },
  {
    id: '3',
    quote: 'We were planning from out of state and Serenity made it feel effortless. Their vendor network and design eye saved us months of stress.',
    author: 'Jessica Torres',
    role: 'Bride',
    weddingDate: 'January 2025',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll('.testimonial-card').forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.transform = 'translateY(0)'
                ;(card as HTMLElement).style.opacity = '1'
              }, i * 200 + 300)
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-lg mx-auto mb-16">
          <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-medium text-champagne bg-champagne/10 mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-espresso mb-4">
            Words from Our Couples
          </h2>
          <p className="text-espresso/60 leading-relaxed">
            The truest measure of our work is the joy of the couples we serve.
          </p>
        </div>

        <div className="flex flex-nowrap gap-8 overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="testimonial-card shrink-0 w-[85vw] lg:w-auto snap-center"
              style={{ transform: 'translateY(40px)', opacity: 0, transition: 'all 0.8s cubic-bezier(0.32,0.72,0,1)' }}
            >
              <div className="rounded-[2rem] bg-cream/50 p-1.5 ring-1 ring-espresso/5 h-full">
                <div className="rounded-[calc(2rem-0.375rem)] bg-white p-8 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-champagne text-champagne" />
                    ))}
                  </div>
                  <blockquote className="text-espresso/70 leading-relaxed text-sm flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-8 pt-6 border-t border-espresso/5">
                    <p className="text-espresso font-medium text-sm">{t.author}</p>
                    <p className="text-espresso/40 text-xs mt-1">{t.role} &middot; {t.weddingDate}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
