import { formatDistanceToNow } from 'date-fns'
import { CookingPot, Timer, ChefHat, UtensilsCrossed } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import type { KitchenOrder } from '../types'

interface KitchenOrderCardProps {
  order: KitchenOrder
  onStatusChange: (orderId: string, newStatus: KitchenOrder['status']) => void
}

const statusConfig = {
  pending: {
    label: 'Pending',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-800',
    icon: UtensilsCrossed,
  },
  preparing: {
    label: 'Preparing',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-800',
    icon: ChefHat,
  },
  ready: {
    label: 'Ready',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-800',
    icon: CookingPot,
  },
} as const

export function KitchenOrderCard({ order, onStatusChange }: KitchenOrderCardProps) {
  const config = statusConfig[order.status]
  const StatusIcon = config.icon
  const elapsed = formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })

  return (
    <div className={cn('rounded-xl border-2 p-6', config.bg, config.border)}>
      <div className={cn('flex items-center justify-between mb-4')}>
        <div className={cn('flex items-center gap-3')}>
          <CookingPot className={cn('size-8', config.text)} />
          <h2 className={cn('text-2xl sm:text-3xl font-bold')}>Table {order.tableNumber}</h2>
        </div>
        <span className={cn('inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold', config.badge)}>
          <StatusIcon className={cn('size-4')} />
          {config.label}
        </span>
      </div>

      <div className={cn('flex items-center gap-1.5 mb-4 text-sm text-gray-500')}>
        <Timer className={cn('size-4')} />
        <span>{elapsed}</span>
      </div>

      <ul className={cn('space-y-2 mb-6')}>
        {order.items.map((item, index) => (
          <li key={index} className={cn('flex items-center justify-between text-base sm:text-lg')}>
            <span>
              <span className={cn('font-semibold')}>{item.quantity}x</span>{' '}
              {item.name}
            </span>
            {item.notes && (
              <span className={cn('text-sm italic text-gray-500')}>{item.notes}</span>
            )}
          </li>
        ))}
      </ul>

      {order.notes && (
        <p className={cn('mb-4 text-sm italic border-t pt-3', config.text)}>
          Note: {order.notes}
        </p>
      )}

      <div className={cn('flex gap-3')}>
        {order.status === 'pending' && (
          <button
            onClick={() => onStatusChange(order.id, 'preparing')}
            className={cn('flex-1 cursor-pointer rounded-lg bg-blue-600 px-4 py-3 text-sm sm:text-lg font-semibold text-white hover:bg-blue-700 transition-colors')}
          >
            Start Preparing
          </button>
        )}
        {order.status === 'preparing' && (
          <button
            onClick={() => onStatusChange(order.id, 'ready')}
            className={cn('flex-1 cursor-pointer rounded-lg bg-green-600 px-4 py-3 text-sm sm:text-lg font-semibold text-white hover:bg-green-700 transition-colors')}
          >
            Mark Ready
          </button>
        )}
      </div>
    </div>
  )
}
