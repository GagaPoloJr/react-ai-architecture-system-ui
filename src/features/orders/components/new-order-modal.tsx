import { useState, useCallback } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@shared/utils/cn'
import { Dialog } from '@shared/ui/molecules/dialog'
import { Button } from '@shared/ui/atoms'
import { orderSchema, type OrderFormValues } from '../schemas'
import type { Table } from '@features/tables/types'
import type { MenuItem } from '@features/menu/types'
import type { CreateOrderDto } from '../types'

interface NewOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tables: Table[]
  menuItems: MenuItem[]
  onSubmit: (data: CreateOrderDto) => void
}

function formatIDR(amount: number) {
  return `Rp ${amount.toLocaleString('en-US')}`
}

export function NewOrderModal({ open, onOpenChange, tables, menuItems, onSubmit }: NewOrderModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isValid },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      tableId: '',
      items: [],
    },
  })

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'items',
  })

  const watchedItems = watch('items')

  const categories = ['all', ...new Set(menuItems.map((m) => m.category))]
  const filteredItems = selectedCategory === 'all' ? menuItems : menuItems.filter((m) => m.category === selectedCategory)

  const total = watchedItems?.reduce((sum, item) => {
    const menuItem = menuItems.find((m) => m.id === item.menuItemId)
    return sum + (menuItem?.price ?? 0) * (item.quantity ?? 0)
  }, 0) ?? 0

  function addItem(menuItem: MenuItem) {
    const existing = fields.find((f) => f.menuItemId === menuItem.id)
    if (existing) {
      const idx = fields.indexOf(existing)
      update(idx, { ...existing, quantity: existing.quantity + 1 })
    } else {
      append({
        menuItemId: menuItem.id,
        quantity: 1,
        notes: '',
      })
    }
  }

  function updateQuantity(index: number, delta: number) {
    const item = fields[index]
    if (!item) return
    const newQty = item.quantity + delta
    if (newQty <= 0) {
      remove(index)
    } else {
      update(index, { menuItemId: item.menuItemId, quantity: newQty, notes: item.notes })
    }
  }

  const handleFormSubmit = useCallback(
    (data: OrderFormValues) => {
      const payload: CreateOrderDto = {
        tableId: data.tableId,
        items: data.items.map((item) => {
          const menuItem = menuItems.find((m) => m.id === item.menuItemId)
          return {
            menuItemId: item.menuItemId,
            name: menuItem?.name ?? '',
            price: menuItem?.price ?? 0,
            quantity: item.quantity,
            notes: item.notes,
          }
        }),
      }
      try {
        onSubmit(payload)
        toast.success('Order created successfully')
        reset()
        onOpenChange(false)
      } catch {
        toast.error('Failed to create order')
      }
    },
    [menuItems, onSubmit, reset, onOpenChange],
  )

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <span className="flex items-center gap-2">
          <ShoppingCart className="size-5 text-brand-600" />
          <span className="text-gradient-brand">New Order</span>
        </span>
      }
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col max-h-[80vh]">
        <div className="flex-1 overflow-y-auto space-y-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-primary">Table</label>
            <select
              {...register('tableId')}
              className="input-field"
            >
              <option value="">Select a table</option>
              {tables
                .filter((t) => t.status === 'available')
                .map((table) => (
                  <option key={table.id} value={table.id}>
                    Table {table.number} (Capacity: {table.capacity})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <div className="mb-3 flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                    selectedCategory === cat
                      ? 'bg-gradient-brand text-text-inverse shadow-sm'
                      : 'bg-surface-alt text-text-secondary hover:bg-surface-hover',
                  )}
                >
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredItems
                .filter((m) => m.isAvailable)
                .map((item) => {
                  const inOrder = fields.find((f) => f.menuItemId === item.id)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => addItem(item)}
                      className={cn(
                        'card-hover cursor-pointer rounded-xl border px-3 py-2 text-left text-sm transition-all',
                        inOrder ? 'border-brand-600 bg-gradient-to-b from-brand-50 to-brand-100/50' : 'border-border-subtle hover:border-brand-400',
                      )}
                    >
                      <span className="block font-medium text-text-primary">{item.name}</span>
                      <span className="block text-xs text-text-tertiary mt-0.5">{formatIDR(item.price)}</span>
                    </button>
                  )
                })}
            </div>
          </div>

          {fields.length > 0 && (
            <div className="glass rounded-xl p-4">
              <h4 className="mb-3 font-medium text-text-primary">Order Summary</h4>
              <div className="space-y-2">
                {fields.map((field, index) => {
                  const menuItem = menuItems.find((m) => m.id === field.menuItemId)
                  return (
                    <div key={field.id} className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface-card px-3 py-2">
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium truncate block text-text-primary">{menuItem?.name ?? 'Unknown'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, -1)}
                          className="cursor-pointer rounded-md p-1 text-text-tertiary transition-colors hover:bg-surface-alt hover:text-text-primary"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="flex size-6 items-center justify-center rounded bg-surface-alt text-sm font-medium text-text-secondary">{field.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, 1)}
                          className="cursor-pointer rounded-md p-1 text-text-tertiary transition-colors hover:bg-surface-alt hover:text-text-primary"
                        >
                          <Plus className="size-4" />
                        </button>
                        <span className="ml-2 text-sm font-medium text-text-secondary">
                          {formatIDR((menuItem?.price ?? 0) * field.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="cursor-pointer rounded-md p-1 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-subtle">
                <span className="font-semibold text-text-primary">Total</span>
                <span className="text-lg font-bold text-gradient-brand">{formatIDR(total)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border-subtle pt-4 mt-4">
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!isValid || fields.length === 0}
          >
            Create Order
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
