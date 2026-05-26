import { SectionHeader } from '@shared/ui/molecules/section-header'
import { cn } from '@shared/utils/cn'
import type { Testimonial } from '../types'

interface TestimonialsSectionProps {
  badge?: string;
  title: string;
  description?: string;
  testimonials: Testimonial[];
}

export function TestimonialsSection({ badge, title, description, testimonials }: TestimonialsSectionProps) {
  return (
    <section className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader badge={badge} title={title} description={description} />

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.id}
              className="rounded-[2.5rem] border border-[rgba(99,102,241,0.12)] bg-white/80 backdrop-blur-xl p-8 lg:p-10 space-y-6 shadow-[0_0_0_1px_rgba(99,102,241,0.04),_0_8px_32px_rgba(99,102,241,0.06)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent/30"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg
                    key={s}
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={cn(s < testimonial.rating ? 'text-amber-400' : 'text-text-secondary/15')}
                  >
                    <path d="M8 1.5l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 12l-4.2 2.5.8-4.7L1.2 6.5l4.7-.7L8 1.5Z" fill="currentColor"/>
                  </svg>
                ))}
              </div>

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent/10">
                <path d="M10 11H6V7h4v4Zm8 0h-4V7h4v4Z" fill="currentColor"/>
                <path d="M14 12v5h-4l-1 3H6l1-3H3v-7l1-1h6l1 1v2h3v-2l1-1h6l1 1v7h-5l1 3h-3l-1-3v-5Z" fill="currentColor"/>
              </svg>

              <blockquote className="text-sm leading-relaxed text-text-secondary">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-[rgba(99,102,241,0.08)]">
                <div className="size-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-accent">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">{testimonial.author}</div>
                  <div className="text-xs text-text-secondary/60">{testimonial.role} &middot; {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
