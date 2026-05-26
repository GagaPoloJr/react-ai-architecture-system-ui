import { Button, ArrowIcon } from '@shared/ui/atoms/button'
import type { HeroContent } from '../types'

interface HeroSectionProps {
  content: HeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-canvas">
        <div className="absolute top-[-20%] right-[-10%] size-[60vw] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] size-[50vw] rounded-full bg-accent/3 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] items-center">
          <div className="space-y-8">
            <span className="inline-block rounded-full border border-[rgba(99,102,241,0.15)] bg-white/60 backdrop-blur-sm px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
              {content.badge}
            </span>

            <h1 className="font-display text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl lg:text-7xl leading-[1.02]">
              {content.title}{' '}
              <span className="text-accent">{content.highlightedPhrase}</span>
            </h1>

            <p className="text-base leading-relaxed text-text-secondary max-w-lg">
              {content.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" asChild>
                <a href={content.primaryCta.href}>
                  {content.primaryCta.text}
                  <ArrowIcon />
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href={content.secondaryCta.href}>{content.secondaryCta.text}</a>
              </Button>
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-xs text-text-secondary">{content.trustIndicator.text}</p>
              <div className="flex flex-wrap gap-8">
                {content.trustIndicator.logos.map((logo) => (
                  <div
                    key={logo.name}
                    className="h-5 text-xs font-medium text-text-secondary/40 transition-colors hover:text-text-secondary/60"
                  >
                    {logo.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-[2.5rem] border border-[rgba(99,102,241,0.12)] bg-white/80 backdrop-blur-xl shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_8px_32px_rgba(99,102,241,0.08)] overflow-hidden">
              <img
                src="/images/hero-workspace.jpg"
                alt="Postlight product workspace"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
