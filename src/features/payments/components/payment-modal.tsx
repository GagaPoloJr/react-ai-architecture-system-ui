import { useState } from 'react'
import { Banknote, CreditCard, QrCode, Check } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import { Dialog } from '@shared/ui/molecules/dialog'
import { Button } from '@shared/ui/atoms'
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
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Process Payment"
      size="sm"
    >
      <div className="text-center py-6">
        <p className="text-sm text-text-secondary">Total Amount</p>
        <p className="mt-1 text-4xl font-bold text-gradient-brand">
          Rp {total.toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {methods.map((method) => {
          const Icon = method.icon
          const isSelected = selectedMethod === method.value
          return (
            <button
              key={method.value}
              type="button"
              onClick={() => setSelectedMethod(method.value)}
              className={cn(
                'card-hover flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
                isSelected
                  ? 'border-brand-600 bg-gradient-to-b from-brand-50 to-brand-100/50 shadow-sm'
                  : 'border-border-subtle bg-surface-card hover:border-border-strong',
              )}
            >
              <div className={cn(
                'flex size-10 items-center justify-center rounded-xl transition-colors',
                isSelected ? 'bg-brand-600 text-white' : 'bg-surface-alt text-text-tertiary',
              )}>
                <Icon className={cn('size-5')} />
              </div>
              <span className={cn('text-sm font-medium', isSelected ? 'text-brand-700' : 'text-text-secondary')}>
                {method.label}
              </span>
              {isSelected && (
                <span className="flex size-5 items-center justify-center rounded-full bg-brand-600">
                  <Check className="size-3 text-white" />
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="pt-6">
        <Button
          className="w-full"
          size="lg"
          onClick={handleConfirm}
          loading={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Process Payment'}
        </Button>
      </div>
    </Dialog>
  )
}
