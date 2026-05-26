import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@shared/utils/cn'
import { forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-espresso text-cream hover:bg-espresso/90',
        secondary: 'border border-espresso/20 text-espresso hover:bg-espresso/5',
        ghost: 'text-espresso/70 hover:text-espresso hover:bg-espresso/5',
      },
      size: {
        default: 'h-11 px-6 py-3',
        lg: 'h-13 px-8 py-4 text-base',
        sm: 'h-9 px-4 py-2 text-xs',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
