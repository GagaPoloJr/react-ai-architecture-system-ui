import { useEffect, useState } from 'react'
import { Clock, ChefHat, UtensilsCrossed, Bell } from 'lucide-react'
import { cn } from '@shared/utils/cn'

interface KitchenHeaderProps {
  pendingCount: number
  preparingCount: number
}

export function KitchenHeader({ pendingCount, preparingCount }: KitchenHeaderProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className={cn('glass-strong sticky top-0 z-30 flex flex-wrap items-center gap-4 sm:gap-6 px-4 sm:px-6 py-4 border-b border-border-subtle/50')}>
      <div className={cn('flex items-center gap-2 text-xl font-semibold text-text-primary')}>
        <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-warm text-white shadow-sm">
          <Clock className={cn('size-5')} />
        </div>
        <time dateTime={time.toISOString()}>
          {time.toLocaleTimeString()}
        </time>
      </div>

      <div className={cn('flex items-center gap-2')}>
        <div className={cn(
          'flex items-center gap-2 rounded-xl px-4 py-2 text-amber-700',
          'bg-gradient-to-r from-amber-100 to-amber-50',
          'border border-amber-200',
        )}>
          <UtensilsCrossed className={cn('size-5')} />
          <span className={cn('text-lg font-bold')}>{pendingCount}</span>
          <span className={cn('text-sm font-medium')}>Pending</span>
          {pendingCount > 0 && (
            <span className="flex size-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
          )}
        </div>
      </div>

      <div className={cn('flex items-center gap-2')}>
        <div className={cn(
          'flex items-center gap-2 rounded-xl px-4 py-2 text-blue-700',
          'bg-gradient-to-r from-blue-100 to-blue-50',
          'border border-blue-200',
        )}>
          <ChefHat className={cn('size-5')} />
          <span className={cn('text-lg font-bold')}>{preparingCount}</span>
          <span className={cn('text-sm font-medium')}>Preparing</span>
        </div>
      </div>

      <div className="ml-auto hidden sm:flex items-center gap-2 text-xs text-text-tertiary">
        <Bell className="size-4 animate-float" />
        <span>Kitchen Display</span>
      </div>
    </header>
  )
}
