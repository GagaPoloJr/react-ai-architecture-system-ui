import { cn } from '@shared/utils/cn'
import { forwardRef } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'double-bezel' | 'glass'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    if (variant === 'double-bezel') {
      return (
        <div
          ref={ref}
          className={cn(
            'rounded-[2rem] bg-black/5 dark:bg-white/5 p-1.5 ring-1 ring-black/5 dark:ring-white/10',
            className,
          )}
          {...props}
        >
          <div className="rounded-[calc(2rem-0.375rem)] bg-white dark:bg-neutral-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            {children}
          </div>
        </div>
      )
    }

    if (variant === 'glass') {
      return (
        <div
          ref={ref}
          className={cn(
            'rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl bg-white border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Card.displayName = 'Card'

export { Card }
