import { X, ShoppingCart, CreditCard } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import type { Order } from '../types'

interface OrderDetailDrawerProps {
  order: Order | null
  open: boolean
  onClose: () => void
  onUpdateStatus: (id: string, status: string) => void
  onProcessPayment: (orderId: string, total: number) => void
}

function formatIDR(amount: number) {
  return `Rp ${amount.toLocaleString('en-US')}`
}

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  preparing: 'Preparing',
  served: 'Served',
  paid: 'Paid',
}

const nextStatus: Record<string, string> = {
  pending: 'preparing',
  preparing: 'served',
  served: 'paid',
  paid: 'paid',
}

const statusButtonLabels: Record<string, string> = {
  pending: 'Mark Preparing',
  preparing: 'Mark Served',
  served: 'Mark Paid',
  paid: 'Paid',
}

export function OrderDetailDrawer({ order, open, onClose, onUpdateStatus, onProcessPayment }: OrderDetailDrawerProps) {
  return (
    <>
      {open && (
        <div
          className={cn('fixed inset-0 z-40 bg-black/30')}
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className={cn('flex items-center justify-between border-b border-gray-200 px-6 py-4')}>
          <div className={cn('flex items-center gap-2')}>
            <ShoppingCart className={cn('size-5 text-gray-500')} />
            <h2 className={cn('text-lg font-bold')}>Order Details</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={cn('cursor-pointer rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700')}
          >
            <X className={cn('size-5')} />
          </button>
        </div>

        {order && (
          <div className={cn('flex flex-col h-[calc(100%-64px)]')}>
            <div className={cn('flex-1 overflow-y-auto px-6 py-4')}>
              <div className={cn('mb-6')}>
                <h3 className={cn('text-2xl font-bold')}>Table {order.tableId}</h3>
                <p className={cn('text-sm text-gray-500')}>Order #{order.id}</p>
              </div>

              <div className={cn('mb-6')}>
                <span className={cn('inline-flex items-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700')}>
                  {statusLabels[order.status]}
                </span>
              </div>

              <h4 className={cn('mb-3 font-semibold text-gray-700')}>Items</h4>
              <ul className={cn('space-y-3 mb-6')}>
                {order.items.map((item, index) => (
                  <li key={index} className={cn('flex items-start justify-between border-b border-gray-100 pb-3')}>
                    <div className={cn('flex-1')}>
                      <span className={cn('font-medium')}>{item.name}</span>
                      <span className={cn('ml-1 text-sm text-gray-500')}>x{item.quantity}</span>
                    </div>
                    <div className={cn('text-right text-sm')}>
                      <p className={cn('text-gray-500')}>{formatIDR(item.price)} each</p>
                      <p className={cn('font-medium')}>{formatIDR(item.price * item.quantity)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={cn('flex items-center justify-between border-t border-gray-200 pt-4 mb-6')}>
                <span className={cn('text-lg font-bold')}>Total</span>
                <span className={cn('text-xl font-bold text-gray-900')}>{formatIDR(order.total)}</span>
              </div>
            </div>

            <div className={cn('border-t border-gray-200 px-6 py-4 space-y-3')}>
              {order.status !== 'paid' && (
                <button
                  type="button"
                  onClick={() => onUpdateStatus(order.id, nextStatus[order.status] ?? order.status)}
                  className={cn('w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2.5 font-medium text-white transition-colors hover:bg-gray-800')}
                >
                  {statusButtonLabels[order.status]}
                </button>
              )}
              {order.status === 'served' && (
                <button
                  type="button"
                  onClick={() => onProcessPayment(order.id, order.total)}
                  className={cn('flex cursor-pointer items-center justify-center gap-2 w-full rounded-lg bg-green-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-green-700')}
                >
                  <CreditCard className={cn('size-4')} />
                  Process Payment
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
