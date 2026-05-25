import { Clock, CookingPot, Hand, CreditCard } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import { OrderCard } from './order-card'
import type { Order } from '../types'

interface ActiveOrdersBoardProps {
  orders: Order[]
  onViewOrder: (id: string) => void
  isLoading?: boolean
}

const columns = [
  { key: 'pending', label: 'Pending', icon: Clock, color: 'border-t-amber-400' },
  { key: 'preparing', label: 'Preparing', icon: CookingPot, color: 'border-t-blue-400' },
  { key: 'served', label: 'Served', icon: Hand, color: 'border-t-green-400' },
  { key: 'paid', label: 'Paid', icon: CreditCard, color: 'border-t-gray-400' },
] as const

function Skeleton() {
  return (
    <div className={cn('rounded-xl border border-gray-200 p-4 animate-pulse')}>
      <div className={cn('flex items-center gap-2 mb-3')}>
        <div className={cn('size-5 rounded bg-gray-200')} />
        <div className={cn('h-6 w-24 rounded bg-gray-200')} />
      </div>
      <div className={cn('h-4 w-20 rounded bg-gray-200 mb-3')} />
      <div className={cn('h-8 rounded bg-gray-200')} />
    </div>
  )
}

export function ActiveOrdersBoard({ orders, onViewOrder, isLoading }: ActiveOrdersBoardProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4')}>
      {columns.map(({ key, label, icon: Icon, color }) => {
        const columnOrders = orders.filter((o) => o.status === key)

        return (
          <div key={key} className={cn('rounded-xl border border-gray-200 bg-gray-50', color)}>
            <div className={cn('flex items-center gap-2 px-4 pt-4 pb-2')}>
              <Icon className={cn('size-5 text-gray-600')} />
              <h3 className={cn('font-semibold text-gray-700')}>{label}</h3>
              <span className={cn('ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600')}>
                {columnOrders.length}
              </span>
            </div>
            <div className={cn('space-y-3 p-4')}>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)
              ) : columnOrders.length === 0 ? (
                <p className={cn('py-8 text-center text-sm text-gray-400')}>No orders yet</p>
              ) : (
                columnOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onViewDetail={onViewOrder} />
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
