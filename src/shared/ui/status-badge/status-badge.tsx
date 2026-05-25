import { cn } from '@shared/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

export const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        pending: 'bg-amber-100 text-amber-800',
        preparing: 'bg-blue-100 text-blue-800',
        served: 'bg-emerald-100 text-emerald-800',
        paid: 'bg-gray-100 text-gray-800',
        occupied: 'bg-amber-100 text-amber-800',
        available: 'bg-emerald-100 text-emerald-800',
        reserved: 'bg-amber-100 text-amber-800',
        ready: 'bg-emerald-100 text-emerald-800',
        default: 'bg-gray-100 text-gray-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface StatusBadgeProps
  extends VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode
  className?: string
}

export function StatusBadge({
  variant,
  children,
  className,
}: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)}>
      {children}
    </span>
  )
}
