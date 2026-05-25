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

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  preparing: 'bg-blue-100 text-blue-800',
  served: 'bg-green-100 text-green-800',
  paid: 'bg-gray-100 text-gray-800',
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
          className={cn('fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in-0 duration-200')}
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full max-w-md bg-gradient-to-b from-surface-card to-surface-alt shadow-2xl transition-transform duration-300 ease-out',
          'border-l border-border-subtle',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className={cn('flex items-center justify-between border-b border-border-subtle px-6 py-4')}>
          <div className={cn('flex items-center gap-2')}>
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-sm">
              <ShoppingCart className={cn('size-5')} />
            </div>
            <h2 className={cn('text-lg font-bold text-text-primary')}>Order Details</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={cn('cursor-pointer rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-alt hover:text-text-primary')}
          >
            <X className={cn('size-5')} />
          </button>
        </div>

        {order && (
          <div className={cn('flex flex-col h-[calc(100%-64px)]')}>
            <div className={cn('flex-1 overflow-y-auto px-6 py-4')}>
              <div className={cn('mb-6')}>
                <h3 className={cn('text-2xl font-bold text-text-primary')}>Table {order.tableId}</h3>
                <p className={cn('text-sm text-text-tertiary')}>Order #{order.id.slice(0, 8)}</p>
              </div>

              <div className={cn('mb-6')}>
                <span className={cn('inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium shadow-sm', statusStyles[order.status])}>
                  {statusLabels[order.status]}
                </span>
              </div>

              <h4 className={cn('mb-3 font-semibold text-text-primary')}>Items</h4>
              <ul className={cn('space-y-3 mb-6')}>
                {order.items.map((item, index) => (
                  <li key={index} className={cn('flex items-start justify-between rounded-xl border border-border-subtle bg-surface-card px-4 py-3')}>
                    <div className={cn('flex-1')}>
                      <span className={cn('font-medium text-text-primary')}>{item.name}</span>
                      <span className={cn('ml-1 text-sm text-text-tertiary')}>x{item.quantity}</span>
                    </div>
                    <div className={cn('text-right text-sm')}>
                      <p className={cn('text-text-tertiary')}>{formatIDR(item.price)} each</p>
                      <p className={cn('font-medium text-text-primary')}>{formatIDR(item.price * item.quantity)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={cn('flex items-center justify-between rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 border border-brand-200 px-4 py-3 mb-6')}>
                <span className={cn('text-lg font-bold text-text-primary')}>Total</span>
                <span className={cn('text-xl font-bold text-gradient-brand')}>{formatIDR(order.total)}</span>
              </div>
            </div>

            <div className={cn('border-t border-border-subtle px-6 py-4 space-y-3 bg-surface-card')}>
              {order.status !== 'paid' && (
                <button
                  type="button"
                  onClick={() => onUpdateStatus(order.id, nextStatus[order.status] ?? order.status)}
                  className={cn('btn w-full rounded-xl bg-gradient-brand px-4 py-2.5 font-medium text-text-inverse shadow-sm')}
                >
                  {statusButtonLabels[order.status]}
                </button>
              )}
              {order.status === 'served' && (
                <button
                  type="button"
                  onClick={() => onProcessPayment(order.id, order.total)}
                  className={cn('btn flex cursor-pointer items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-2.5 font-medium text-text-inverse shadow-sm')}
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
