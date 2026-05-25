import { cn } from '@shared/utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  glass?: boolean
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({ className, padding = 'md', hover = false, glass = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        glass ? 'card-glass' : 'card',
        hover && !glass && 'card-hover',
        paddingMap[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
