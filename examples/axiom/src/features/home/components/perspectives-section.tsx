import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollReveal } from '@shared/hooks'
import type { Perspective } from '../types'

interface PerspectivesSectionProps {
  posts?: Perspective[]
}

const defaultPosts: Perspective[] = [
  {
    id: '1',
    slug: 'design-systems-are-not-enough',
    title: 'Design systems are not enough',
    excerpt: 'Why organizations need strategic design infrastructure, not just component libraries.',
    content: '',
    coverImage: '/images/portfolio-1.jpg',
    author: { name: 'Marcus Chen', role: 'Chief Design Officer' },
    category: 'Design',
    publishedAt: '2026-04-12',
    readingTime: 8,
  },
  {
    id: '2',
    slug: 'the-case-for-bespoke-software',
    title: 'The case for bespoke software',
    excerpt: 'When off-the-shelf solutions fail, custom engineering creates durable advantage.',
    content: '',
    coverImage: '/images/portfolio-2.jpg',
    author: { name: 'Sofia Reyes', role: 'Chief Technology Officer' },
    category: 'Engineering',
    publishedAt: '2026-03-28',
    readingTime: 12,
  },
  {
    id: '3',
    slug: 'strategy-as-storytelling',
    title: 'Strategy as storytelling',
    excerpt: 'How narrative structures drive better strategic decisions in complex organizations.',
    content: '',
    coverImage: '/images/portfolio-3.jpg',
    author: { name: 'James Okonkwo', role: 'Head of Strategy' },
    category: 'Strategy',
    publishedAt: '2026-03-15',
    readingTime: 6,
  },
  {
    id: '4',
    slug: 'measuring-what-matters',
    title: 'Measuring what matters',
    excerpt: 'Beyond vanity metrics: building outcome-driven measurement frameworks.',
    content: '',
    coverImage: '/images/portfolio-4.jpg',
    author: { name: 'Ana Voss', role: 'Founder & CEO' },
    category: 'Strategy',
    publishedAt: '2026-02-20',
    readingTime: 10,
  },
]

export function PerspectivesSection({ posts = defaultPosts }: PerspectivesSectionProps) {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useRef<HTMLDivElement>(null!)

  useGSAP(() => {
    gsap.fromTo('.perspective-card',
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
    <section className="py-28 md:py-36 lg:py-44 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef}>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-text-primary">
            Perspectives
          </h2>
          <p className="mt-6 text-lg text-text-secondary max-w-xl leading-relaxed">
            Essays on strategy, design, and engineering from the Axiom team.
          </p>
        </div>
        <div ref={gridRef} className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {posts.map((post) => (
            <a
              key={post.id}
              href={`/perspectives/${post.slug}`}
              className="perspective-card group bg-canvas p-0 flex flex-col hover:opacity-60 transition-opacity duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <p className="text-xs tracking-widest uppercase text-text-secondary mb-2">
                  {post.category}
                </p>
                <h3 className="font-serif text-xl md:text-2xl text-text-primary leading-snug">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <p className="mt-6 text-xs tracking-widest uppercase text-text-secondary">
                  {post.author.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
