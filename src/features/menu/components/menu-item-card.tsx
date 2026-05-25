import { cn } from '@shared/utils/cn'
import { Plus, Image } from 'lucide-react'
import { Card } from '@shared/ui/atoms'
import { Button } from '@shared/ui/atoms'
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
    <Card padding="none" className="group overflow-hidden">
      <div className="relative overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200 transition-transform duration-500 group-hover:scale-110">
            <Image className="h-12 w-12 text-amber-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span
          className={cn(
            'absolute right-2 top-2 inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium shadow-sm',
            catStyle.bg,
            catStyle.text,
          )}
        >
          {item.category}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <h3 className="font-semibold text-text-primary group-hover:text-brand-700 transition-colors">
          {item.name}
        </h3>

        <p className="text-lg font-bold text-gradient-brand">{formatPrice(item.price)}</p>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm text-text-secondary">
            <span
              className={cn(
                'size-2.5 rounded-full',
                item.isAvailable ? 'bg-green-500 animate-glow-pulse-brand' : 'bg-red-500',
              )}
            />
            {item.isAvailable ? 'Available' : 'Unavailable'}
          </span>

          {onAddToOrder && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddToOrder(item)}
              disabled={!item.isAvailable}
            >
              <Plus className="size-4" />
              Add
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
