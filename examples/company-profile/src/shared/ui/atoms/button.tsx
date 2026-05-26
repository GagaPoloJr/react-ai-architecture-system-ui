import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { forwardRef } from 'react'

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center text-sm font-medium transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'rounded-full bg-accent text-white hover:bg-accent/90 active:-translate-y-px',
        secondary:
          'rounded-full border border-border bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary active:-translate-y-px',
        ghost:
          'rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-hover active:-translate-y-px',
      },
      size: {
        sm: 'h-9 px-4 text-xs gap-2',
        md: 'h-11 px-6 text-sm gap-2.5',
        lg: 'h-13 px-8 text-base gap-3',
        xl: 'h-14 px-10 text-lg gap-3',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export const ArrowIcon = () => (
  <span className="inline-flex size-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-current">
      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  showArrow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, showArrow = false, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Slot>
      )
    }
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
        {showArrow && <ArrowIcon />}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
