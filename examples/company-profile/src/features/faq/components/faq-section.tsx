import { SectionHeader } from '@shared/ui/molecules/section-header'
import { cn } from '@shared/utils/cn'
import { useState } from 'react'
import type { FAQCategory } from '../types'

interface FAQSectionProps {
  badge?: string;
  title: string;
  description?: string;
  categories: FAQCategory[];
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer',
        open ? 'border-accent/20 bg-accent/[0.02]' : 'border-[rgba(99,102,241,0.1)] bg-white/40 hover:border-accent/20',
      )}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="text-sm font-medium text-text-primary">{question}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={cn('shrink-0 text-text-secondary transition-transform duration-500', open && 'rotate-180')}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {open && (
        <div className="px-6 pb-5 text-sm leading-relaxed text-text-secondary/80">
          {answer}
        </div>
      )}
    </div>
  )
}

export function FAQSection({ badge, title, description, categories }: FAQSectionProps) {
  return (
    <section className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeader badge={badge} title={title} description={description} align="center" />

        <div className="mt-16 space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="space-y-3">
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-text-secondary/40 px-1">{category.name}</h3>
              {category.items.map((item) => (
                <FAQItem key={item.id} question={item.question} answer={item.answer} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
