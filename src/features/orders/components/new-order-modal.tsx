import { useState, useCallback } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { Plus, Minus, Trash2, ShoppingCart, X } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@shared/utils/cn'
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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={cn('fixed inset-0 z-40 bg-black/30')} />
        <Dialog.Content
          className={cn('fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-2xl')}
        >
          <div className={cn('flex items-center justify-between border-b border-gray-200 px-6 py-4')}>
            <Dialog.Title className={cn('flex items-center gap-2 text-lg font-bold')}>
              <ShoppingCart className={cn('size-5')} />
              New Order
            </Dialog.Title>
            <Dialog.Close className={cn('rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700')}>
              <X className={cn('size-5')} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className={cn('flex flex-col max-h-[80vh]')}>
            <div className={cn('flex-1 overflow-y-auto px-6 py-4 space-y-6')}>
              <div>
                <label className={cn('mb-1.5 block text-sm font-medium text-gray-700')}>Table</label>
                <select
                  {...register('tableId')}
                  className={cn('w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900')}
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
                <div className={cn('mb-3 flex gap-2 flex-wrap')}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        'cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                        selectedCategory === cat
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                      )}
                    >
                      {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>

                <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-2')}>
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
                            'cursor-pointer rounded-lg border px-3 py-2 text-left text-sm transition-all hover:border-gray-400',
                            inOrder ? 'border-gray-900 bg-gray-50' : 'border-gray-200',
                          )}
                        >
                          <span className={cn('block font-medium')}>{item.name}</span>
                          <span className={cn('block text-xs text-gray-500')}>{formatIDR(item.price)}</span>
                        </button>
                      )
                    })}
                </div>
              </div>

              {fields.length > 0 && (
                <div>
                  <h4 className={cn('mb-2 font-medium text-gray-700')}>Order Summary</h4>
                  <div className={cn('space-y-2')}>
                    {fields.map((field, index) => {
                      const menuItem = menuItems.find((m) => m.id === field.menuItemId)
                      return (
                        <div key={field.id} className={cn('flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2')}>
                          <div className={cn('flex-1 min-w-0')}>
                            <span className={cn('text-sm font-medium truncate block')}>{menuItem?.name ?? 'Unknown'}</span>
                          </div>
                          <div className={cn('flex items-center gap-1.5 shrink-0')}>
                            <button
                              type="button"
                              onClick={() => updateQuantity(index, -1)}
                              className={cn('cursor-pointer rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700')}
                            >
                              <Minus className={cn('size-4')} />
                            </button>
                            <span className={cn('w-6 text-center text-sm font-medium')}>{field.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(index, 1)}
                              className={cn('cursor-pointer rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700')}
                            >
                              <Plus className={cn('size-4')} />
                            </button>
                            <span className={cn('ml-2 text-sm font-medium text-gray-700')}>
                              {formatIDR((menuItem?.price ?? 0) * field.quantity)}
                            </span>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className={cn('cursor-pointer rounded-md p-1 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600')}
                            >
                              <Trash2 className={cn('size-4')} />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className={cn('flex items-center justify-between mt-3 pt-3 border-t border-gray-200')}>
                    <span className={cn('font-semibold')}>Total</span>
                    <span className={cn('text-lg font-bold')}>{formatIDR(total)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className={cn('border-t border-gray-200 px-6 py-4')}>
              <button
                type="submit"
                disabled={!isValid || fields.length === 0}
                className={cn(
                  'w-full cursor-pointer rounded-lg px-4 py-2.5 font-medium text-white transition-colors',
                  isValid && fields.length > 0
                    ? 'bg-gray-900 hover:bg-gray-800'
                    : 'bg-gray-300 cursor-not-allowed',
                )}
              >
                Create Order
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
