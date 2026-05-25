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
    <div className="mx-auto max-w-sm rounded-xl border bg-white p-6 shadow-sm">
      <div className="text-center">
        <h3 className="font-mono text-lg font-bold">Warung Bahari</h3>
        <p className="font-mono text-xs text-gray-500">Payment Receipt</p>
      </div>

      <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-t border-dashed pt-4 font-mono text-xs">
        <span className="text-gray-500">Date</span>
        <span className="text-right">{formatDate(payment.paidAt)}</span>
        <span className="text-gray-500">Table</span>
        <span className="text-right">{order.tableId}</span>
      </div>

      <div className="mt-4 border-t border-dashed pt-4">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1 font-mono text-xs">
          <span className="text-left text-gray-500">Item</span>
          <span className="text-right text-gray-500">Qty</span>
          <span className="text-right text-gray-500">Price</span>
          {order.items.map((item, index) => (
            <div key={index} className="contents">
              <span className="truncate py-0.5">{item.name}</span>
              <span className="py-0.5 text-right">{item.quantity}</span>
              <span className="py-0.5 text-right">{formatPrice(item.quantity * item.price)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-t border-dashed pt-4 font-mono text-xs">
        <span className="font-bold">Total</span>
        <span className="text-right font-bold">{formatPrice(itemsTotal)}</span>
        <span className="text-gray-500">Payment</span>
        <span className="text-right capitalize">{methodLabels[payment.method]}</span>
        <span className="text-gray-500">Amount Paid</span>
        <span className="text-right">{formatPrice(payment.amount)}</span>
      </div>

      {payment.status === 'completed' && (
        <div className="mt-4 flex items-center justify-center gap-1 text-xs text-green-600">
          <CheckCircle2 className="h-4 w-4" />
          <span>Payment Completed</span>
        </div>
      )}

      {onPrint && (
        <button
          type="button"
          onClick={onPrint}
          className={cn(
            'mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800',
          )}
        >
          <Printer className="h-4 w-4" />
          Print Receipt
        </button>
      )}
    </div>
  )
}
