import { useState } from 'react'
import { toast } from 'sonner'
import { useOrderList, useUpdateOrderStatus } from '@features/orders'
import { useCreatePayment } from '@features/payments'
import { ActiveOrdersBoard, OrderDetailDrawer } from '@features/orders/components'
import { PaymentModal } from '@features/payments/components'
import type { CreatePaymentDto } from '@features/payments/types'

export default function OrdersPage() {
  const { data: orders = [], isLoading, refetch } = useOrderList()
  const updateStatus = useUpdateOrderStatus()
  const createPayment = useCreatePayment()

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [paymentOpen, setPaymentOpen] = useState(false)

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) ?? null

  function handleViewOrder(id: string) {
    setSelectedOrderId(id)
  }

  function handleCloseDrawer() {
    setSelectedOrderId(null)
  }

  function handleUpdateStatus(id: string, status: string) {
    updateStatus.mutate(
      { id, status },
      {
        onSuccess: () => toast.success('Order status updated'),
        onError: () => toast.error('Failed to update status'),
      },
    )
  }

  function handleProcessPayment(orderId: string, _total: number) {
    setSelectedOrderId(orderId)
    setPaymentOpen(true)
  }

  function handlePaymentConfirm(data: CreatePaymentDto) {
    createPayment.mutate(data, {
      onSuccess: () => {
        toast.success('Payment processed')
        setPaymentOpen(false)
        setSelectedOrderId(null)
      },
      onError: () => toast.error('Payment failed'),
    })
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Orders Board</h1>
        <button
          type="button"
          onClick={() => refetch()}
          className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      <ActiveOrdersBoard
        orders={orders}
        onViewOrder={handleViewOrder}
        isLoading={isLoading}
      />

      <OrderDetailDrawer
        order={selectedOrder}
        open={!!selectedOrderId}
        onClose={handleCloseDrawer}
        onUpdateStatus={handleUpdateStatus}
        onProcessPayment={handleProcessPayment}
      />

      <PaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        total={selectedOrder?.total ?? 0}
        orderId={selectedOrderId ?? ''}
        onConfirm={handlePaymentConfirm}
        isProcessing={createPayment.isPending}
      />
    </div>
  )
}
