import { CookingPot } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import { KitchenHeader } from './kitchen-header'
import { KitchenOrderCard } from './kitchen-order-card'
import { useKitchenOrders, useUpdateKitchenStatus } from '../api'
import type { KitchenOrder } from '../types'

export function KitchenDisplay() {
  const { data: orders, isLoading } = useKitchenOrders()
  const updateStatus = useUpdateKitchenStatus()

  const activeOrders = (orders ?? []).filter(
    (o) => o.status === 'pending' || o.status === 'preparing'
  )

  const pendingCount = activeOrders.filter((o) => o.status === 'pending').length
  const preparingCount = activeOrders.filter((o) => o.status === 'preparing').length

  function handleStatusChange(orderId: string, newStatus: KitchenOrder['status']) {
    updateStatus.mutate({ orderId, status: newStatus })
  }

  return (
    <div className={cn('min-h-[100dvh] bg-surface')}>
      <KitchenHeader pendingCount={pendingCount} preparingCount={preparingCount} />

      <main className={cn('p-4 sm:p-6 bg-noise')}>
        {isLoading ? (
          <div className={cn('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6')}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : activeOrders.length === 0 ? (
          <div className={cn('flex flex-col items-center justify-center py-32 text-text-tertiary')}>
            <div className="flex size-24 items-center justify-center rounded-3xl bg-gradient-to-br from-green-100 to-emerald-200 mb-6 shadow-sm">
              <CookingPot className={cn('size-12 text-emerald-600 animate-float')} />
            </div>
            <p className={cn('text-2xl font-semibold text-text-primary')}>All orders completed</p>
            <p className={cn('text-lg text-text-tertiary mt-1')}>Waiting for new orders...</p>
          </div>
        ) : (
          <div className={cn('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6')}>
            {activeOrders.map((order) => (
              <KitchenOrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function Skeleton() {
  return (
    <div className={cn('rounded-xl border-2 border-border-subtle p-6 animate-pulse bg-gradient-to-br from-surface-card to-surface-alt')}>
      <div className={cn('flex items-center gap-3 mb-4')}>
        <div className={cn('size-12 rounded-xl bg-border-default')} />
        <div className={cn('space-y-2')}>
          <div className={cn('h-8 w-40 rounded bg-border-default')} />
          <div className={cn('h-4 w-24 rounded bg-border-default')} />
        </div>
      </div>
      <div className={cn('h-4 w-32 rounded bg-border-default mb-4')} />
      <div className={cn('space-y-2 mb-6')}>
        <div className={cn('h-6 w-full rounded bg-border-default')} />
        <div className={cn('h-6 w-3/4 rounded bg-border-default')} />
        <div className={cn('h-6 w-1/2 rounded bg-border-default')} />
      </div>
      <div className={cn('h-12 w-full rounded-xl bg-border-default')} />
    </div>
  )
}
