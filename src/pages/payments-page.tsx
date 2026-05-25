import { CreditCard } from 'lucide-react'

export default function PaymentsPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-24 text-gray-400">
      <CreditCard className="mb-4 size-16" />
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Payment History</h1>
      <p className="text-lg">Payment history coming soon</p>
    </div>
  )
}
