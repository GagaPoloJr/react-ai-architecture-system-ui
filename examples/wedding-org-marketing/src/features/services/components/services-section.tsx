import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Calendar, Palette, Users, Star } from 'lucide-react'

const services = [
  {
    id: 'full-planning',
    title: 'Full Planning',
    description: 'From vision to execution — we handle every detail so you can savor every moment.',
    icon: Star,
    features: ['Venue sourcing & selection', 'Vendor coordination', 'Budget management', 'Timeline creation'],
    startingPrice: 8500,
  },
  {
    id: 'partial-planning',
    title: 'Partial Planning',
    description: 'Already have a vision? We step in to refine and execute your plans flawlessly.',
    icon: Calendar,
    features: ['Vendor referrals', 'Design consultation', 'Logistics management', 'Day-of rehearsal'],
    startingPrice: 4800,
  },
  {
    id: 'day-of-coordination',
    title: 'Day-of Coordination',
    description: 'Relax and enjoy your day while our team ensures everything runs seamlessly.',
    icon: Heart,
    features: ['Timeline management', 'Vendor check-in', 'Setup & breakdown', 'Emergency support'],
    startingPrice: 2200,
  },
  {
    id: 'design-styling',
    title: 'Design & Styling',
    description: 'Transform any space into a breathtaking reflection of your love story.',
    icon: Palette,
    features: ['Mood board creation', 'Floral design', 'Lighting design', 'Rental curation'],
    startingPrice: 3500,
  },
  {
    id: 'vendor-management',
    title: 'Vendor Management',
    description: 'We connect you with the best vendors and manage them so you don\'t have to.',
    icon: Users,
    features: ['Curated vendor list', 'Contract negotiation', 'Schedule coordination', 'Quality assurance'],
    startingPrice: 1800,
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll('.service-card').forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.transform = 'translateY(0)'
                ;(card as HTMLElement).style.opacity = '1'
              }, i * 100 + 300)
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
    <section ref={sectionRef} id="services" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-lg mb-16">
          <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-medium text-sage bg-sage/10 mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-espresso mb-4">
            Tailored to Your Love Story
          </h2>
          <p className="text-espresso/60 leading-relaxed">
            Every couple is unique, so every plan should be too. Explore our range of services designed to match your needs and vision.
          </p>
        </div>

        <div className="flex flex-nowrap gap-6 overflow-x-auto pb-6 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="service-card shrink-0 w-[320px] lg:w-auto group cursor-pointer"
              style={{ transform: 'translateY(40px)', opacity: 0, transition: 'all 0.8s cubic-bezier(0.32,0.72,0,1)' }}
            >
              <div className="rounded-[2rem] bg-cream/50 p-1.5 ring-1 ring-espresso/5 hover:ring-sage/20 transition-all duration-500">
                <div className="rounded-[calc(2rem-0.375rem)] bg-white p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mb-6">
                    <service.icon className="w-5 h-5 text-sage" />
                  </div>
                  <h3 className="text-lg font-medium text-espresso mb-3">{service.title}</h3>
                  <p className="text-sm text-espresso/60 leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((f) => (
                      <li key={f} className="text-sm text-espresso/50 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-sage" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-espresso/5">
                    <span className="text-sm">
                      <span className="text-espresso font-medium">${service.startingPrice.toLocaleString()}</span>
                      <span className="text-espresso/40"> starting</span>
                    </span>
                    <span className="w-8 h-8 rounded-full bg-espresso/5 flex items-center justify-center group-hover:bg-sage/10 transition-colors">
                      <ArrowRight className="w-4 h-4 text-espresso/40" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-espresso/70 hover:text-espresso transition-colors"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
