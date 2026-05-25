import { useEffect, useState } from 'react'
import { Clock, ChefHat, UtensilsCrossed } from 'lucide-react'
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
    <header className={cn('flex flex-wrap items-center gap-4 sm:gap-6 px-4 sm:px-6 py-4')}>
      <div className={cn('flex items-center gap-2 text-xl font-semibold')}>
        <Clock className={cn('size-6')} />
        <time dateTime={time.toISOString()}>
          {time.toLocaleTimeString()}
        </time>
      </div>
      <div className={cn('flex items-center gap-2 text-amber-600')}>
        <UtensilsCrossed className={cn('size-5')} />
        <span className={cn('text-lg font-medium')}>{pendingCount} Pending</span>
      </div>
      <div className={cn('flex items-center gap-2 text-blue-600')}>
        <ChefHat className={cn('size-5')} />
        <span className={cn('text-lg font-medium')}>{preparingCount} Preparing</span>
      </div>
    </header>
  )
}
