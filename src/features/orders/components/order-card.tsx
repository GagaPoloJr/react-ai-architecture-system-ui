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
    <div className={cn('rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md')}>
      <div className={cn('flex items-center justify-between mb-3')}>
        <div className={cn('flex items-center gap-2')}>
          <UtensilsCrossed className={cn('size-5 text-gray-500')} />
          <span className={cn('text-lg sm:text-xl font-bold truncate')}>Table {order.tableId}</span>
        </div>
        <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', statusStyles[order.status])}>
          {statusLabels[order.status] ?? order.status}
        </span>
      </div>

      <div className={cn('flex items-center justify-between mb-3')}>
        <span className={cn('text-sm text-gray-500')}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
        <span className={cn('flex items-center gap-1 text-sm text-gray-500')}>
          <Clock className={cn('size-3.5')} />
          {elapsed}
        </span>
      </div>

      <div className={cn('flex items-center justify-between')}>
        <span className={cn('text-base sm:text-lg font-bold text-gray-900')}>{formatIDR(order.total)}</span>
        <button
          type="button"
          onClick={() => onViewDetail(order.id)}
          className={cn('flex cursor-pointer items-center gap-1 rounded-lg bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800')}
        >
          View Details
          <ChevronRight className={cn('size-4')} />
        </button>
      </div>
    </div>
  )
}
