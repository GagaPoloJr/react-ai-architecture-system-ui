import { cn } from '@shared/utils/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
}

export function Skeleton({ className, variant = 'rectangular', ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-border-subtle via-border-default/50 to-border-subtle bg-[length:400%_100%]',
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'h-4 rounded-md',
        variant === 'rectangular' && 'rounded-lg',
        className,
      )}
      {...props}
    />
  )
}
