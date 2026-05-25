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
    <div className={cn('min-h-[100dvh] bg-gray-50')}>
      <KitchenHeader pendingCount={pendingCount} preparingCount={preparingCount} />

      <main className={cn('p-6')}>
        {isLoading ? (
          <div className={cn('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6')}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : activeOrders.length === 0 ? (
          <div className={cn('flex flex-col items-center justify-center py-24 text-gray-400')}>
            <CookingPot className={cn('size-16 mb-4')} />
            <p className={cn('text-2xl font-semibold')}>All orders completed</p>
            <p className={cn('text-lg')}>Waiting for new orders...</p>
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
    <div className={cn('rounded-xl border-2 border-gray-200 p-6 animate-pulse')}>
      <div className={cn('flex items-center gap-3 mb-4')}>
        <div className={cn('size-8 rounded-lg bg-gray-200')} />
        <div className={cn('h-8 w-40 rounded bg-gray-200')} />
      </div>
      <div className={cn('h-4 w-32 rounded bg-gray-200 mb-4')} />
      <div className={cn('space-y-2 mb-6')}>
        <div className={cn('h-6 w-full rounded bg-gray-200')} />
        <div className={cn('h-6 w-3/4 rounded bg-gray-200')} />
        <div className={cn('h-6 w-1/2 rounded bg-gray-200')} />
      </div>
      <div className={cn('h-12 w-full rounded-lg bg-gray-200')} />
    </div>
  )
}
