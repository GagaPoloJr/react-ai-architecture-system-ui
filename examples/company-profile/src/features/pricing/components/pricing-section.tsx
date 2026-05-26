import { SectionHeader } from '@shared/ui/molecules/section-header'
import { Button, ArrowIcon } from '@shared/ui/atoms/button'
import { cn } from '@shared/utils/cn'
import type { PricingTier } from '../types'

interface PricingSectionProps {
  badge?: string;
  title: string;
  description?: string;
  tiers: PricingTier[];
}

export function PricingSection({ badge, title, description, tiers }: PricingSectionProps) {
  return (
    <section className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader badge={badge} title={title} description={description} />

        <div className="mt-20 grid gap-6 md:grid-cols-3 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                'rounded-[2.5rem] border bg-white/80 backdrop-blur-xl p-8 lg:p-10 space-y-6 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]',
                tier.isPopular
                  ? 'border-accent/30 shadow-[0_0_0_1px_rgba(99,102,241,0.08),_0_8px_32px_rgba(99,102,241,0.1)]'
                  : 'border-[rgba(99,102,241,0.12)] shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_8px_32px_rgba(99,102,241,0.06)] hover:border-accent/30',
              )}
            >
              {tier.isPopular && (
                <span className="inline-block rounded-full bg-accent/10 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                  Popular
                </span>
              )}

              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold text-text-primary tracking-tight">{tier.name}</h3>
                <p className="text-sm text-text-secondary">{tier.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold tracking-tight text-text-primary">
                  {tier.currency}{tier.monthlyPrice}
                </span>
                <span className="text-sm text-text-secondary">/month</span>
              </div>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3 text-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={cn('mt-0.5 shrink-0', feature.included ? 'text-accent' : 'text-text-secondary/20')}
                    >
                      <path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={feature.included ? 'text-text-secondary' : 'text-text-secondary/30'}>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.isPopular ? 'primary' : 'secondary'}
                className="w-full"
                asChild
              >
                <a href={tier.ctaHref}>
                  {tier.ctaText}
                  <ArrowIcon />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
