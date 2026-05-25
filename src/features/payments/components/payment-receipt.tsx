import { Printer, CheckCircle2 } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import type { Payment } from '../types'

interface PaymentReceiptProps {
  payment: Payment
  order: {
    tableId: string
    items: { name: string; quantity: number; price: number }[]
  }
  onPrint?: () => void
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatPrice(amount: number) {
  return `Rp${amount.toLocaleString()}`
}

const methodLabels: Record<string, string> = {
  cash: 'Cash',
  card: 'Card',
  qris: 'QRIS',
}

export function PaymentReceipt({ payment, order, onPrint }: PaymentReceiptProps) {
  const itemsTotal = order.items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-elevated">
      <div className="text-center">
        <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-sm">
          <Printer className="size-6" />
        </div>
        <h3 className="font-mono text-lg font-bold text-text-primary">Warung Bahari</h3>
        <p className="font-mono text-xs text-text-tertiary">Payment Receipt</p>
      </div>

      <div className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-dashed border-border-default pt-4 font-mono text-xs">
        <span className="text-text-tertiary">Date</span>
        <span className="text-right text-text-secondary">{formatDate(payment.paidAt)}</span>
        <span className="text-text-tertiary">Table</span>
        <span className="text-right text-text-secondary">{order.tableId}</span>
      </div>

      <div className="mt-4 border-t border-dashed border-border-default pt-4">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1.5 font-mono text-xs">
          <span className="text-left text-text-tertiary">Item</span>
          <span className="text-right text-text-tertiary">Qty</span>
          <span className="text-right text-text-tertiary">Price</span>
          {order.items.map((item, index) => (
            <div key={index} className="contents">
              <span className="truncate py-0.5 text-text-secondary">{item.name}</span>
              <span className="py-0.5 text-right text-text-secondary">{item.quantity}</span>
              <span className="py-0.5 text-right text-text-secondary">{formatPrice(item.quantity * item.price)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-dashed border-border-default pt-4 font-mono text-xs">
        <span className="font-bold text-text-primary">Total</span>
        <span className="text-right font-bold text-gradient-brand">{formatPrice(itemsTotal)}</span>
        <span className="text-text-tertiary">Payment</span>
        <span className="text-right capitalize text-text-secondary">{methodLabels[payment.method]}</span>
        <span className="text-text-tertiary">Amount Paid</span>
        <span className="text-right text-text-secondary">{formatPrice(payment.amount)}</span>
      </div>

      {payment.status === 'completed' && (
        <div className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-green-50 border border-green-200 py-2 text-sm text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          <span className="font-medium">Payment Completed</span>
        </div>
      )}

      {onPrint && (
        <button
          type="button"
          onClick={onPrint}
          className={cn(
            'btn mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-medium text-text-inverse shadow-sm',
          )}
        >
          <Printer className="h-4 w-4" />
          Print Receipt
        </button>
      )}
    </div>
  )
}
