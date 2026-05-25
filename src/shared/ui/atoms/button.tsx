import { forwardRef } from 'react'
import { cn } from '@shared/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'btn',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-brand text-text-inverse shadow-sm hover:shadow-md hover:brightness-110 active:brightness-95',
        secondary: 'bg-surface-alt text-text-primary hover:bg-surface-hover border border-border-default',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-alt',
        destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md',
        outline: 'border-2 border-brand-600 text-brand-700 hover:bg-brand-50 active:bg-brand-100',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-sm',
        xl: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), loading && 'relative text-transparent', className)}
        disabled={disabled || loading}
        {...props}
      >
        {children}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg className="h-4 w-4 animate-spin text-current" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </span>
        )}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
