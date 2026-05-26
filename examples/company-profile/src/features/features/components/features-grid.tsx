import { SectionHeader } from '@shared/ui/molecules/section-header'
import type { ProductFeature } from '../types'

const featureImages: Record<string, string> = {
  '1': '/images/feature-collab.jpg',
  '2': '/images/feature-analytics.jpg',
  '3': '/images/feature-coding.jpg',
}

interface FeaturesGridProps {
  badge?: string;
  title: string;
  description?: string;
  features: ProductFeature[];
}

export function FeaturesGrid({ badge, title, description, features }: FeaturesGridProps) {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader badge={badge} title={title} description={description} />

        <div className="mt-20 space-y-24">
          {features.map((feature, i) => (
            <div
              key={feature.id}
              className="grid gap-12 lg:grid-cols-2 items-center"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-6">
                  <span className="text-2xl font-medium">{feature.icon}</span>
                </div>
                <h3 className="font-display text-3xl font-semibold tracking-tight text-text-primary leading-[1.1]">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-text-secondary max-w-md">
                  {feature.description}
                </p>
                <ul className="mt-8 space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-text-secondary">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-accent">
                        <path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="rounded-[2.5rem] border border-[rgba(99,102,241,0.12)] bg-white/80 backdrop-blur-xl shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_8px_32px_rgba(99,102,241,0.06)] overflow-hidden">
                  <img
                    src={featureImages[feature.id] || featureImages['1']}
                    alt={feature.title}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
