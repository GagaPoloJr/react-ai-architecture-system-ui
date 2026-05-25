import { cn } from '@shared/utils/cn'
import { Plus, Search } from 'lucide-react'
import type { MenuItemFilters } from '../types'

interface MenuFilterBarProps {
  filters: MenuItemFilters
  onFilterChange: (filters: MenuItemFilters) => void
  onAddItem: () => void
}

const categories = [
  { label: 'All', value: '' },
  { label: 'Food', value: 'food' },
  { label: 'Beverage', value: 'beverage' },
  { label: 'Snack', value: 'snack' },
] as const

export function MenuFilterBar({
  filters,
  onFilterChange,
  onAddItem,
}: MenuFilterBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => onFilterChange({ ...filters, category: cat.value })}
            className={cn(
              'cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              (filters.category === cat.value ||
                (!filters.category && cat.value === ''))
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            )}
          >
            {cat.label}
          </button>
        ))}

        <div className="ml-auto flex w-full sm:w-auto items-center gap-3">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu..."
              value={filters.search ?? ''}
              onChange={(e) =>
                onFilterChange({ ...filters, search: e.target.value })
              }
              className="w-full sm:w-64 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={onAddItem}
            className={cn(
              'inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              'bg-blue-600 text-white hover:bg-blue-700',
            )}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Item</span>
          </button>
        </div>
      </div>
    </div>
  )
}
