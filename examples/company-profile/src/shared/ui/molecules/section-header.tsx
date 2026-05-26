import { cn } from '@shared/utils/cn'

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ badge, title, description, align = 'left', className }: SectionHeaderProps) {
  return (
    <div className={cn('max-w-xl space-y-5', align === 'center' && 'mx-auto text-center', className)}>
      {badge && (
        <span className="inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">
          {badge}
        </span>
      )}
      <h2 className="font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl lg:text-6xl leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-text-secondary max-w-lg">
          {description}
        </p>
      )}
    </div>
  )
}
