import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Button } from '@shared/ui'
import type { PricingPlan } from '../types'

const plans: PricingPlan[] = [
  {
    id: 'essentials',
    name: 'Essentials',
    description: 'Perfect for intimate celebrations with minimal planning needs.',
    price: 2200,
    features: ['Day-of coordination', 'Timeline management', 'Vendor check-in', 'Setup supervision', 'Emergency hotline'],
    isPopular: false,
    cta: 'Get Started',
  },
  {
    id: 'signature',
    name: 'Signature',
    description: 'Our most popular choice for couples seeking a balanced planning experience.',
    price: 5800,
    features: ['Partial planning support', 'Design consultation', 'Vendor sourcing', 'Budget tracking', 'Rehearsal coordination', 'Full day-of management'],
    isPopular: true,
    cta: 'Most Popular',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'The full white-glove experience from proposal to farewell dance.',
    price: 12000,
    features: ['Full planning & design', 'Unlimited consultations', 'Venue scouting', 'Full vendor management', 'Custom design & styling', 'Guest accommodation coordination', 'Post-wedding brunch planning'],
    isPopular: false,
    cta: 'Go Luxury',
  },
]

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll('.pricing-card').forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.transform = 'translateY(0)'
                ;(card as HTMLElement).style.opacity = '1'
              }, i * 150 + 300)
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
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-lg mx-auto mb-16">
          <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-medium text-sage bg-sage/10 mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-espresso mb-4">
            Transparent Pricing
          </h2>
          <p className="text-espresso/60 leading-relaxed">
            No hidden fees, no surprises — just clear, thoughtful packages designed to fit your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`pricing-card relative ${plan.isPopular ? 'md:-mt-4 md:mb-4' : ''}`}
              style={{ transform: 'translateY(40px)', opacity: 0, transition: 'all 0.8s cubic-bezier(0.32,0.72,0,1)' }}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 rounded-full bg-espresso text-cream px-4 py-1 text-[10px] uppercase tracking-wider font-medium">
                  Most Popular
                </div>
              )}
              <div className={`rounded-[2rem] p-1.5 h-full ${plan.isPopular ? 'bg-espresso ring-1 ring-espresso' : 'bg-white ring-1 ring-espresso/5'}`}>
                <div className={`rounded-[calc(2rem-0.375rem)] p-8 md:p-10 h-full flex flex-col ${plan.isPopular ? 'bg-espresso text-cream' : 'bg-white'}`}>
                  <h3 className="text-lg font-medium mb-2">{plan.name}</h3>
                  <p className={`text-sm leading-relaxed mb-6 ${plan.isPopular ? 'text-cream/60' : 'text-espresso/60'}`}>
                    {plan.description}
                  </p>
                  <div className="mb-8">
                    <span className="text-3xl md:text-4xl font-light">${plan.price.toLocaleString()}</span>
                  </div>
                  <ul className="space-y-3 mb-10 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.isPopular ? 'text-champagne' : 'text-sage'}`} />
                        <span className={plan.isPopular ? 'text-cream/70' : 'text-espresso/60'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button
                      variant={plan.isPopular ? 'secondary' : 'primary'}
                      className={`w-full ${plan.isPopular ? 'bg-cream text-espresso hover:bg-cream/90 border-0' : ''}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
