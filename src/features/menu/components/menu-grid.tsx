import { Button } from '@shared/ui/atoms'
import { RefreshCw } from 'lucide-react'
import { MenuItemCard } from './menu-item-card'
import type { MenuItem } from '../types'

interface MenuGridProps {
  items: MenuItem[]
  isLoading: boolean
  error: Error | null
  onRetry: () => void
  onAddToOrder?: (item: MenuItem) => void
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-border-subtle bg-surface-card shadow-sm"
        >
          <div className="h-48 w-full animate-pulse bg-gradient-to-br from-border-subtle to-border-default/50" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-gradient-to-r from-border-subtle to-border-default/50" />
            <div className="h-5 w-1/3 animate-pulse rounded bg-gradient-to-r from-border-subtle to-border-default/50" />
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 animate-pulse rounded bg-gradient-to-r from-border-subtle to-border-default/50" />
              <div className="h-8 w-20 animate-pulse rounded-lg bg-gradient-to-r from-border-subtle to-border-default/50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ onAddItem }: { onAddItem?: () => void }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium text-text-secondary">
          No menu items found
        </p>
        {onAddItem && (
          <p className="mt-2 text-sm text-text-tertiary">
            Get started by adding your first menu item.
          </p>
        )}
      </div>
    </div>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium text-text-primary">
          Failed to load menu
        </p>
        <Button
          onClick={onRetry}
          className="mt-4"
          variant="secondary"
        >
          <RefreshCw className="size-4" />
          Retry
        </Button>
      </div>
    </div>
  )
}

export function MenuGrid({
  items,
  isLoading,
  error,
  onRetry,
  onAddToOrder,
}: MenuGridProps) {
  if (isLoading) {
    return <SkeletonGrid />
  }

  if (error) {
    return <ErrorState onRetry={onRetry} />
  }

  if (!items.length) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} onAddToOrder={onAddToOrder} />
      ))}
    </div>
  )
}
