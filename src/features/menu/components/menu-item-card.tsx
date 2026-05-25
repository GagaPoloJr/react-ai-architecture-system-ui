import { cn } from '@shared/utils/cn'
import { Plus, Circle, Image } from 'lucide-react'
import type { MenuItem } from '../types'

interface MenuItemCardProps {
  item: MenuItem
  onAddToOrder?: (item: MenuItem) => void
}

const categoryStyles: Record<MenuItem['category'], { bg: string; text: string }> = {
  food: { bg: 'bg-amber-100', text: 'text-amber-800' },
  beverage: { bg: 'bg-blue-100', text: 'text-blue-800' },
  snack: { bg: 'bg-green-100', text: 'text-green-800' },
}

function formatPrice(price: number): string {
  return `Rp ${price.toLocaleString('id-ID')}`
}

export function MenuItemCard({ item, onAddToOrder }: MenuItemCardProps) {
  const catStyle = categoryStyles[item.category]

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
          <Image className="h-12 w-12 text-amber-400" />
        </div>
      )}

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <span
            className={cn(
              'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium',
              catStyle.bg,
              catStyle.text,
            )}
          >
            {item.category}
          </span>
        </div>

        <p className="text-lg font-bold text-gray-900">{formatPrice(item.price)}</p>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <Circle
              className={cn(
                'h-2.5 w-2.5',
                item.isAvailable
                  ? 'fill-green-500 text-green-500'
                  : 'fill-red-500 text-red-500',
              )}
            />
            {item.isAvailable ? 'Available' : 'Unavailable'}
          </span>

          {onAddToOrder && (
            <button
              type="button"
              onClick={() => onAddToOrder(item)}
              disabled={!item.isAvailable}
              className={cn(
                'inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                'bg-blue-600 text-white hover:bg-blue-700',
                'disabled:cursor-not-allowed disabled:opacity-50',
              )}
            >
              <Plus className="h-4 w-4" />
              Add to Order
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
