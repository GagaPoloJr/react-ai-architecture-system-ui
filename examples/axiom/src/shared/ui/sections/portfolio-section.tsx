import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollReveal } from '@shared/hooks'

export interface PortfolioItem {
  id: string
  name: string
  description: string
  logoUrl: string
  websiteUrl: string
  category: string
  featured: boolean
}

interface PortfolioSectionProps {
  items?: PortfolioItem[]
}

const defaultItems: PortfolioItem[] = [
  { id: '1', name: 'Sonder', description: 'Reimagining the travel planning experience for a modern audience.', logoUrl: '', websiteUrl: '#', category: 'Consumer', featured: true },
  { id: '2', name: 'Tectonic', description: 'Enterprise infrastructure platform for geological data analysis.', logoUrl: '', websiteUrl: '#', category: 'Enterprise', featured: true },
  { id: '3', name: 'Pulse', description: 'Real-time health monitoring system for clinical research.', logoUrl: '', websiteUrl: '#', category: 'Health', featured: false },
  { id: '4', name: 'Forma', description: 'Collaborative design tool for distributed creative teams.', logoUrl: '', websiteUrl: '#', category: 'SaaS', featured: false },
  { id: '5', name: 'North', description: 'Sustainable supply chain platform for global manufacturers.', logoUrl: '', websiteUrl: '#', category: 'Enterprise', featured: false },
  { id: '6', name: 'Aether', description: 'Climate analytics engine powering next-generation forecasting.', logoUrl: '', websiteUrl: '#', category: 'Climate', featured: false },
]

export function PortfolioSection({ items = defaultItems }: PortfolioSectionProps) {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useRef<HTMLDivElement>(null!)

  useGSAP(() => {
    gsap.fromTo('.portfolio-card',
      { opacity: 0, scale: 0.95, y: 24 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: gridRef })

  return (
    <section className="py-28 md:py-36 lg:py-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef}>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-text-primary">
            Selected work
          </h2>
          <p className="mt-6 text-lg text-text-secondary max-w-xl leading-relaxed">
            A cross-section of projects spanning strategy, design, and engineering.
          </p>
        </div>
        <div ref={gridRef} className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.websiteUrl}
              className="portfolio-card group bg-canvas p-8 md:p-10 hover:opacity-60 transition-opacity duration-500 flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <p className="text-xs tracking-widest uppercase text-text-secondary mb-3">
                  {item.category}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl text-text-primary">
                  {item.name}
                </h3>
                <p className="mt-3 text-text-secondary leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
              {item.logoUrl && (
                <img src={item.logoUrl} alt={`${item.name} logo`} className="mt-6 h-6 w-auto object-contain opacity-50" />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
