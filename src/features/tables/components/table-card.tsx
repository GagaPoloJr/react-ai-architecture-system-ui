import { cn } from '@shared/utils/cn'
import { Users, Circle } from 'lucide-react'
import type { Table } from '@features/tables/types'

interface TableCardProps {
  table: Table
  onSelect?: (table: Table) => void
}

const statusStyles = {
  available: {
    border: 'border-green-500',
    badge: 'bg-green-500',
    glow: 'shadow-glow-brand',
  },
  occupied: {
    border: 'border-red-400',
    badge: 'bg-red-400',
    glow: 'shadow-glow-amber',
  },
  reserved: {
    border: 'border-amber-400',
    badge: 'bg-amber-400',
    glow: 'shadow-glow-amber',
  },
}

export function TableCard({ table, onSelect }: TableCardProps) {
  const style = statusStyles[table.status]

  return (
    <button
      type="button"
      onClick={() => onSelect?.(table)}
      className={cn(
        'card-hover relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-6',
        style.border,
        'bg-surface-card',
      )}
    >
      <Circle className={cn('absolute right-3 top-3 size-3 fill-current', style.badge)} />
      <span className="text-2xl font-bold text-text-primary">{table.number}</span>
      <span className="flex items-center gap-1.5 text-sm text-text-secondary">
        <Users className="size-4" />
        {table.capacity}
      </span>
      <span
        className={cn(
          'mt-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
          table.status === 'available' && 'bg-green-100 text-green-700',
          table.status === 'occupied' && 'bg-red-100 text-red-700',
          table.status === 'reserved' && 'bg-amber-100 text-amber-700',
        )}
      >
        {table.status}
      </span>
    </button>
  )
}
