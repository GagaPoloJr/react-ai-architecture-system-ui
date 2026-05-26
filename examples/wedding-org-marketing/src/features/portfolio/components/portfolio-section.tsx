import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { WeddingProject } from '../types'

const projects: WeddingProject[] = [
  {
    id: '1',
    title: 'Garden Romance',
    couple: { name: 'Emma & James' },
    date: 'June 2025',
    venue: 'The Botanic Gardens',
    description: 'An intimate garden celebration with wildflower arrangements and golden hour photography.',
    thumbnailUrl: 'https://picsum.photos/seed/wedding-1/800/600',
    category: 'Garden',
  },
  {
    id: '2',
    title: 'Industrial Elegance',
    couple: { name: 'Sophie & Marcus' },
    date: 'April 2025',
    venue: 'The Foundry Loft',
    description: 'A modern industrial space transformed with soft draping and candlelit tables.',
    thumbnailUrl: 'https://picsum.photos/seed/wedding-2/800/700',
    category: 'Industrial',
  },
  {
    id: '3',
    title: 'Coastal Charm',
    couple: { name: 'Olivia & Noah' },
    date: 'March 2025',
    venue: 'Sunset Cliff Resort',
    description: 'A breezy seaside ceremony with nautically-inspired details and ocean views.',
    thumbnailUrl: 'https://picsum.photos/seed/wedding-3/800/500',
    category: 'Beach',
  },
  {
    id: '4',
    title: 'Grand Ballroom',
    couple: { name: 'Isabella & William' },
    date: 'February 2025',
    venue: 'The Ritz-Carlton',
    description: 'A lavish black-tie affair with crystal chandeliers and an eight-tier cake.',
    thumbnailUrl: 'https://picsum.photos/seed/wedding-4/800/650',
    category: 'Luxury',
  },
]

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll('.project-card').forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.transform = 'translateY(0)'
                ;(card as HTMLElement).style.opacity = '1'
              }, i * 120 + 300)
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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-lg">
            <span className="inline-block rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-medium text-dusty-rose bg-dusty-rose/10 mb-4">
              Our Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-espresso mb-4">
              Weddings We&apos;ve Shaped
            </h2>
            <p className="text-espresso/60 leading-relaxed">
              Each wedding we produce is a unique collaboration — here are some of our favorite stories.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-espresso/70 hover:text-espresso transition-colors shrink-0"
          >
            View Full Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className={`project-card group cursor-pointer ${i === 0 ? 'md:row-span-2' : ''}`}
              style={{ transform: 'translateY(40px)', opacity: 0, transition: 'all 0.8s cubic-bezier(0.32,0.72,0,1)' }}
            >
              <div className="rounded-[2rem] bg-white p-1.5 ring-1 ring-espresso/5 overflow-hidden hover:ring-sage/20 transition-all duration-500">
                <div className="rounded-[calc(2rem-0.375rem)] overflow-hidden">
                  <div
                    className={`bg-cover bg-center ${i === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                    style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                  >
                    <div className="w-full h-full bg-gradient-to-t from-espresso/60 via-transparent to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <h3 className="text-cream text-lg font-medium">{project.title}</h3>
                      <p className="text-cream/70 text-sm">{project.couple.name} &middot; {project.venue}</p>
                    </div>
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
