import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Banknote, CreditCard, QrCode, X } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import type { CreatePaymentDto } from '../types'

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  total: number
  orderId: string
  onConfirm: (data: CreatePaymentDto) => void
  isProcessing: boolean
}

const methods = [
  { value: 'cash' as const, label: 'Cash', icon: Banknote },
  { value: 'card' as const, label: 'Card', icon: CreditCard },
  { value: 'qris' as const, label: 'QRIS', icon: QrCode },
]

export function PaymentModal({
  open,
  onOpenChange,
  total,
  orderId,
  onConfirm,
  isProcessing,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'cash' | 'card' | 'qris'>('cash')

  function handleConfirm() {
    onConfirm({ orderId, amount: total, method: selectedMethod })
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold">Process Payment</Dialog.Title>
          <Dialog.Close className="absolute right-4 top-4 cursor-pointer rounded-lg p-1 text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </Dialog.Close>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="mt-1 text-3xl font-bold">Rp {total.toLocaleString()}</p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {methods.map((method) => {
              const Icon = method.icon
              const isSelected = selectedMethod === method.value
              return (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => setSelectedMethod(method.value)}
                  className={cn(
                    'flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors',
                    isSelected
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300',
                  )}
                >
                  <Icon className={cn('h-6 w-6', isSelected ? 'text-gray-900' : 'text-gray-400')} />
                  <span className={cn('text-sm font-medium', isSelected ? 'text-gray-900' : 'text-gray-500')}>
                    {method.label}
                  </span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isProcessing}
            className={cn(
              'mt-6 w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors',
              isProcessing
                ? 'cursor-not-allowed bg-gray-400'
                : 'cursor-pointer bg-gray-900 hover:bg-gray-800',
            )}
          >
            {isProcessing ? 'Processing...' : 'Process Payment'}
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
