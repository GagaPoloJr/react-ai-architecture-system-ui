import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollReveal } from '@shared/hooks'
import type { ImpactMetric } from '../types'

interface ImpactSectionProps {
  metrics?: ImpactMetric[]
}

const defaultMetrics: ImpactMetric[] = [
  { id: '1', value: '15+', label: 'Years in business', description: 'Founded in 2009, we have spent over a decade helping organizations navigate change.' },
  { id: '2', value: '200+', label: 'Projects delivered', description: 'From startups to Fortune 500 companies, across every major industry.' },
  { id: '3', value: '80+', label: 'Team members', description: 'Strategists, designers, and engineers working across three global offices.' },
  { id: '4', value: '92%', label: 'Client retention rate', description: 'Our longest partnership has lasted over a decade.' },
]

function CountUpMetric({ metric }: { metric: ImpactMetric }) {
  const ref = useRef<HTMLSpanElement>(null!)

  useGSAP(() => {
    const num = parseInt(metric.value)
    if (isNaN(num)) return

    const obj = { val: 0 }
    gsap.to(obj, {
      val: num,
      duration: 2,
      ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = metric.value.includes('%')
            ? Math.round(obj.val) + '%'
            : Math.round(obj.val).toLocaleString() + '+'
        }
      },
    })
  })

  return <span ref={ref} className="font-serif text-7xl md:text-8xl lg:text-9xl text-text-primary leading-none">{metric.value}</span>
}

export function ImpactSection({ metrics = defaultMetrics }: ImpactSectionProps) {
  const headingRef = useScrollReveal<HTMLDivElement>()
  const dividerRef = useScrollReveal<HTMLDivElement>({ type: 'line-draw' })

  return (
    <section className="py-28 md:py-36 lg:py-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="max-w-3xl">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-text-primary">
            Impact, not vanity
          </h2>
          <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed">
            We measure success by outcomes. Here is what that looks like after fifteen years of doing the work.
          </p>
        </div>

        <div className="mt-8 w-full h-px bg-border">
          <div ref={dividerRef} className="h-full bg-text-primary origin-left" />
        </div>

        <div className="mt-20 space-y-24">
          {metrics.map((metric) => (
            <div key={metric.id} className="grid md:grid-cols-12 gap-6 md:gap-12 items-start">
              <div className="md:col-span-4">
                <CountUpMetric metric={metric} />
              </div>
              <div className="md:col-span-3">
                <p className="text-sm tracking-widest uppercase text-text-secondary">
                  {metric.label}
                </p>
              </div>
              <div className="md:col-span-5">
                <p className="text-text-secondary leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
