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
    fill: 'fill-green-500',
  },
  occupied: {
    border: 'border-red-400',
    badge: 'bg-red-400',
    fill: 'fill-red-400',
  },
  reserved: {
    border: 'border-amber-400',
    badge: 'bg-amber-400',
    fill: 'fill-amber-400',
  },
}

export function TableCard({ table, onSelect }: TableCardProps) {
  const style = statusStyles[table.status]

  return (
    <button
      type="button"
      onClick={() => onSelect?.(table)}
      className={cn(
        'relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-6 shadow-sm transition-all hover:shadow-md',
        style.border,
      )}
    >
      <span className="absolute right-2 top-2">
        <Circle className={cn('h-3 w-3', style.fill)} />
      </span>
      <span className="text-2xl font-bold">{table.number}</span>
      <span className="flex items-center gap-1 text-sm text-gray-500">
        <Users className="h-4 w-4" />
        {table.capacity}
      </span>
    </button>
  )
}
