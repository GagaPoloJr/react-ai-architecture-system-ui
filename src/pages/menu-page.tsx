import { useState } from 'react'
import { toast } from 'sonner'
import {
  useMenuList,
  useCreateMenuItem,
  useUpdateMenuItem,
} from '@features/menu'
import { MenuFilterBar, MenuGrid, MenuFormDialog } from '@features/menu/components'
import type { MenuItem, MenuItemFilters, CreateMenuItemDto, UpdateMenuItemDto } from '@features/menu/types'

export default function MenuPage() {
  const [filters, setFilters] = useState<MenuItemFilters>({})
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const { data: items = [], isLoading, error, refetch } = useMenuList(filters)
  const createItem = useCreateMenuItem()
  const updateItem = useUpdateMenuItem()

  function handleAddItem() {
    setEditingItem(null)
    setDialogOpen(true)
  }

  function handleSubmit(data: CreateMenuItemDto | UpdateMenuItemDto) {
    if (editingItem) {
      updateItem.mutate(
        { id: editingItem.id, data: data as UpdateMenuItemDto },
        {
          onSuccess: () => {
            toast.success('Menu item updated')
            setDialogOpen(false)
            setEditingItem(null)
          },
          onError: () => {
            toast.error('Failed to update menu item')
          },
        },
      )
    } else {
      createItem.mutate(data as CreateMenuItemDto, {
        onSuccess: () => {
          toast.success('Menu item created')
          setDialogOpen(false)
        },
        onError: () => {
          toast.error('Failed to create menu item')
        },
      })
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Menu Management</h1>
      </div>

      <div className="mb-6">
        <MenuFilterBar
          filters={filters}
          onFilterChange={setFilters}
          onAddItem={handleAddItem}
        />
      </div>

      <MenuGrid
        items={items}
        isLoading={isLoading}
        error={error}
        onRetry={() => refetch()}
      />

      <MenuFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialData={editingItem ?? undefined}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
