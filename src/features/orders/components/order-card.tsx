import { formatDistanceToNow } from 'date-fns'
import { UtensilsCrossed, Clock, ChevronRight } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import type { Order } from '../types'

interface OrderCardProps {
  order: Order
  onViewDetail: (id: string) => void
}

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  preparing: 'bg-blue-100 text-blue-800',
  served: 'bg-green-100 text-green-800',
  paid: 'bg-gray-100 text-gray-800',
}

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  preparing: 'Preparing',
  served: 'Served',
  paid: 'Paid',
}

function formatIDR(amount: number) {
  return `Rp ${amount.toLocaleString('en-US')}`
}

export function OrderCard({ order, onViewDetail }: OrderCardProps) {
  const elapsed = formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className={cn('card-hover rounded-xl border border-border-subtle bg-surface-card p-4')}>
      <div className={cn('flex items-center justify-between mb-3')}>
        <div className={cn('flex items-center gap-2')}>
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-100 to-brand-200">
            <UtensilsCrossed className={cn('size-4 text-brand-700')} />
          </div>
          <span className={cn('text-lg sm:text-xl font-bold truncate text-text-primary')}>Table {order.tableId}</span>
        </div>
        <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium shadow-sm', statusStyles[order.status])}>
          {statusLabels[order.status] ?? order.status}
        </span>
      </div>

      <div className={cn('flex items-center justify-between mb-3')}>
        <span className={cn('text-sm text-text-tertiary')}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
        <span className={cn('flex items-center gap-1 text-sm text-text-tertiary')}>
          <Clock className={cn('size-3.5')} />
          {elapsed}
        </span>
      </div>

      <div className={cn('flex items-center justify-between')}>
        <span className={cn('text-base sm:text-lg font-bold text-gradient-brand')}>{formatIDR(order.total)}</span>
        <button
          type="button"
          onClick={() => onViewDetail(order.id)}
          className={cn('btn flex cursor-pointer items-center gap-1 rounded-lg bg-gradient-brand px-3 py-1.5 text-sm font-medium text-text-inverse shadow-sm')}
        >
          Details
          <ChevronRight className={cn('size-4')} />
        </button>
      </div>
    </div>
  )
}
