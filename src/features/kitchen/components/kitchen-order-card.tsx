import { formatDistanceToNow } from 'date-fns'
import { CookingPot, Timer, ChefHat, UtensilsCrossed, ArrowRight, Check } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import type { KitchenOrder } from '../types'

interface KitchenOrderCardProps {
  order: KitchenOrder
  onStatusChange: (orderId: string, newStatus: KitchenOrder['status']) => void
}

const statusConfig = {
  pending: {
    label: 'Pending',
    border: 'border-amber-300',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: UtensilsCrossed,
    glow: 'animate-glow-pulse',
    gradient: 'from-amber-50 to-amber-100/30',
  },
  preparing: {
    label: 'Preparing',
    border: 'border-blue-300',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: ChefHat,
    glow: '',
    gradient: 'from-blue-50 to-blue-100/30',
  },
  ready: {
    label: 'Ready',
    border: 'border-green-300',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-800 border-green-200',
    icon: CookingPot,
    glow: 'animate-glow-pulse-brand',
    gradient: 'from-green-50 to-green-100/30',
  },
} as const

export function KitchenOrderCard({ order, onStatusChange }: KitchenOrderCardProps) {
  const config = statusConfig[order.status]
  const StatusIcon = config.icon
  const elapsed = formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })

  return (
    <div className={cn(
      'card-hover rounded-xl border-2 p-6 bg-gradient-to-br shadow-sm',
      config.gradient,
      config.border,
      config.glow,
    )}>
      <div className={cn('flex items-center justify-between mb-4')}>
        <div className={cn('flex items-center gap-3')}>
          <div className={cn(
            'flex size-12 items-center justify-center rounded-xl',
            order.status === 'pending' && 'bg-amber-200/50',
            order.status === 'preparing' && 'bg-blue-200/50',
            order.status === 'ready' && 'bg-green-200/50',
          )}>
            <CookingPot className={cn('size-7', config.text)} />
          </div>
          <div>
            <h2 className={cn('text-2xl sm:text-3xl font-bold text-text-primary')}>Table {order.tableNumber}</h2>
            <span className={cn('text-sm text-text-tertiary')}>Order #{order.id.slice(0, 8)}</span>
          </div>
        </div>
        <span className={cn('inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold shadow-sm', config.badge)}>
          <StatusIcon className={cn('size-4')} />
          {config.label}
        </span>
      </div>

      <div className={cn('flex items-center gap-1.5 mb-4 text-sm text-text-tertiary')}>
        <Timer className={cn('size-4')} />
        <span>{elapsed}</span>
      </div>

      <ul className={cn('space-y-2 mb-6')}>
        {order.items.map((item, index) => (
          <li
            key={index}
            className={cn(
              'flex items-center justify-between rounded-lg px-3 py-2 text-base sm:text-lg',
              'bg-surface-card/60',
              index > 0 && 'border-t border-border-subtle/50',
            )}
          >
            <span>
              <span className={cn('font-bold text-text-primary')}>{item.quantity}x</span>{' '}
              <span className="text-text-secondary">{item.name}</span>
            </span>
            {item.notes && (
              <span className={cn('ml-2 text-sm italic text-text-tertiary')}>{item.notes}</span>
            )}
          </li>
        ))}
      </ul>

      {order.notes && (
        <p className={cn('mb-4 rounded-lg border border-dashed border-border-default px-3 py-2 text-sm italic', config.text)}>
          Note: {order.notes}
        </p>
      )}

      <div className={cn('flex gap-3')}>
        {order.status === 'pending' && (
          <button
            onClick={() => onStatusChange(order.id, 'preparing')}
            className={cn(
              'btn flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500',
              'px-4 py-3 text-sm sm:text-lg font-semibold text-white shadow-sm hover:shadow-md',
            )}
          >
            Start Preparing
            <ArrowRight className="size-5" />
          </button>
        )}
        {order.status === 'preparing' && (
          <button
            onClick={() => onStatusChange(order.id, 'ready')}
            className={cn(
              'btn flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500',
              'px-4 py-3 text-sm sm:text-lg font-semibold text-white shadow-sm hover:shadow-md',
            )}
          >
            <Check className="size-5" />
            Mark Ready
          </button>
        )}
      </div>
    </div>
  )
}
