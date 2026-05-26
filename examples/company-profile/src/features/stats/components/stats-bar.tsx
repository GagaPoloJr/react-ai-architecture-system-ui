import type { StatItem } from '../types'

interface StatsBarProps {
  stats: StatItem[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="relative border-b border-[rgba(99,102,241,0.08)] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="space-y-2 text-center md:text-left">
              <div className="font-display text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
                {stat.prefix}{stat.value}{stat.suffix}
              </div>
              <div className="text-sm font-medium text-text-primary">{stat.label}</div>
              {stat.description && (
                <div className="text-xs text-text-secondary/50">{stat.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
