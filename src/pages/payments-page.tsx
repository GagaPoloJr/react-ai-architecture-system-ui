import { CreditCard } from 'lucide-react'

export default function PaymentsPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-24 text-text-tertiary">
      <div className="flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-100 to-brand-200 mb-6 shadow-sm">
        <CreditCard className="size-10 text-brand-600" />
      </div>
      <h1 className="mb-2 text-2xl font-bold text-text-primary">Payment History</h1>
      <p className="text-lg text-text-tertiary">Payment history coming soon</p>
    </div>
  )
}
