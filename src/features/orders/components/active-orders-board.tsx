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
  { key: 'pending', label: 'Pending', icon: Clock, color: 'from-amber-500/20 to-amber-500/5 border-t-amber-400' },
  { key: 'preparing', label: 'Preparing', icon: CookingPot, color: 'from-blue-500/20 to-blue-500/5 border-t-blue-400' },
  { key: 'served', label: 'Served', icon: Hand, color: 'from-green-500/20 to-green-500/5 border-t-green-400' },
  { key: 'paid', label: 'Paid', icon: CreditCard, color: 'from-gray-500/20 to-gray-500/5 border-t-gray-400' },
] as const

function SkeletonColumn() {
  return (
    <div className={cn('rounded-xl border border-border-subtle p-4 animate-pulse')}>
      <div className={cn('flex items-center gap-2 mb-3')}>
        <div className={cn('size-5 rounded bg-border-default')} />
        <div className={cn('h-6 w-24 rounded bg-border-default')} />
      </div>
      <div className={cn('h-4 w-20 rounded bg-border-default mb-3')} />
      <div className={cn('h-8 rounded bg-border-default')} />
    </div>
  )
}

export function ActiveOrdersBoard({ orders, onViewOrder, isLoading }: ActiveOrdersBoardProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4')}>
      {columns.map(({ key, label, icon: Icon, color }) => {
        const columnOrders = orders.filter((o) => o.status === key)

        return (
          <div
            key={key}
            className={cn(
              'rounded-xl border border-border-subtle bg-gradient-to-b overflow-hidden',
              color,
            )}
          >
            <div className={cn('flex items-center gap-2 px-4 pt-4 pb-2')}>
              <div className={cn(
                'flex size-8 items-center justify-center rounded-lg',
                key === 'pending' && 'bg-amber-100',
                key === 'preparing' && 'bg-blue-100',
                key === 'served' && 'bg-green-100',
                key === 'paid' && 'bg-gray-100',
              )}>
                <Icon className={cn(
                  'size-4',
                  key === 'pending' && 'text-amber-700',
                  key === 'preparing' && 'text-blue-700',
                  key === 'served' && 'text-green-700',
                  key === 'paid' && 'text-gray-600',
                )} />
              </div>
              <h3 className={cn(
                'font-semibold',
                key === 'pending' && 'text-amber-800',
                key === 'preparing' && 'text-blue-800',
                key === 'served' && 'text-green-800',
                key === 'paid' && 'text-gray-700',
              )}>{label}</h3>
              <span className={cn(
                'ml-auto rounded-full px-2 py-0.5 text-xs font-medium',
                key === 'pending' && 'bg-amber-200/50 text-amber-800',
                key === 'preparing' && 'bg-blue-200/50 text-blue-800',
                key === 'served' && 'bg-green-200/50 text-green-800',
                key === 'paid' && 'bg-gray-200/50 text-gray-700',
              )}>
                {columnOrders.length}
              </span>
            </div>
            <div className={cn('space-y-3 p-4')}>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => <SkeletonColumn key={i} />)
              ) : columnOrders.length === 0 ? (
                <p className={cn('py-8 text-center text-sm text-text-tertiary')}>No orders yet</p>
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
