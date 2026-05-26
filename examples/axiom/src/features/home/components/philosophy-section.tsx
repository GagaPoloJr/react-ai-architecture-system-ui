import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollReveal } from '@shared/hooks'
import type { PhilosophyStatement, Belief } from '../types'

interface PhilosophySectionProps {
  statement?: PhilosophyStatement
  beliefs?: Belief[]
}

const defaultStatement: PhilosophyStatement = {
  title: 'Design is not decoration.',
  body: 'It is the fundamental structure of how things work. At Axiom, we believe that great design emerges from deep understanding — of users, of systems, of the problems that matter. We partner with organizations to build clarity from complexity.',
}

const defaultBeliefs: Belief[] = [
  { id: '1', text: 'Strategy without craft is consulting. Craft without strategy is art.', author: 'Dieter Rams', role: 'Influence' },
  { id: '2', text: 'The best interface is no interface. The best system is invisible.', author: 'Axiom Design', role: 'Principle' },
  { id: '3', text: 'Every line of code is a design decision. Every pixel is a product choice.', author: 'Mike Monteiro', role: 'Influence' },
  { id: '4', text: 'Research is not a phase. It is a discipline.', author: 'Erika Hall', role: 'Influence' },
  { id: '5', text: 'Good design is as little design as possible. Less, but better.', author: 'Dieter Rams', role: 'Influence' },
]

export function PhilosophySection({ statement = defaultStatement, beliefs = defaultBeliefs }: PhilosophySectionProps) {
  const statementRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useRef<HTMLDivElement>(null!)

  useGSAP(() => {
    gsap.fromTo('.belief-card',
      { opacity: 0, scale: 0.95, y: 24 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 1,
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
        <div ref={statementRef}>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-text-primary max-w-5xl">
            &ldquo;{statement.title}&rdquo;
          </h2>
          <p className="mt-8 text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
            {statement.body}
          </p>
        </div>
        <div ref={gridRef} className="mt-28 grid md:grid-cols-2 gap-x-16 gap-y-20">
          {beliefs.map((belief) => (
            <blockquote key={belief.id} className="belief-card">
              <p className="font-serif text-2xl md:text-3xl leading-snug text-text-primary">
                {belief.text}
              </p>
              <footer className="mt-4 text-sm text-text-secondary tracking-widest uppercase">
                {belief.author} — {belief.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
