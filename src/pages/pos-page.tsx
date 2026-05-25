import { useState } from 'react'
import { toast } from 'sonner'
import { Plus, Minus, Send, CreditCard, Trash2, ShoppingCart, X, Circle } from 'lucide-react'
import { cn } from '@shared/utils/cn'
import { formatCurrency } from '@shared/lib/format'
import { useTableList } from '@features/tables'
import { useMenuList } from '@features/menu'
import { useCreateOrder } from '@features/orders'
import { useCreatePayment } from '@features/payments'
import { PaymentModal } from '@features/payments/components'
import { useOrderStore } from '@stores/order-store'
import type { MenuItem } from '@features/menu/types'
import type { CreatePaymentDto } from '@features/payments/types'

function MenuSelectionModal({
  open,
  onClose,
  onSelect,
  items,
}: {
  open: boolean
  onClose: () => void
  onSelect: (item: MenuItem) => void
  items: MenuItem[]
}) {
  const [category, setCategory] = useState('all')
  const categories = ['all', ...new Set(items.map((m) => m.category))]
  const filtered = category === 'all' ? items : items.filter((m) => m.category === category)

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in-0 duration-200" onClick={onClose} />
      <div
        className={cn(
          'fixed left-1/2 top-1/2 z-50 max-h-[80vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'overflow-y-auto rounded-2xl bg-surface-card p-6 shadow-dialog',
          'animate-in zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] duration-200',
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <ShoppingCart className="size-5 text-brand-600" />
            <span className="text-gradient-brand">Add Item</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-alt hover:text-text-primary"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                'cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                category === cat
                  ? 'bg-gradient-brand text-text-inverse shadow-sm'
                  : 'bg-surface-alt text-text-secondary hover:bg-surface-hover',
              )}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {filtered
            .filter((m) => m.isAvailable)
            .map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                className={cn(
                  'card-hover cursor-pointer rounded-xl border border-border-subtle bg-surface-card px-3 py-2.5 text-left text-sm',
                  'hover:border-brand-400 hover:shadow-sm',
                )}
              >
                <span className="block font-medium text-text-primary">{item.name}</span>
                <span className="block text-xs text-text-tertiary mt-0.5">
                  {formatCurrency(item.price)}
                </span>
              </button>
            ))}
        </div>
      </div>
    </>
  )
}

export default function PosPage() {
  const { data: tables, isLoading: tablesLoading, isError: tablesError } = useTableList()
  const { data: menuItems = [] } = useMenuList()
  const createOrder = useCreateOrder()
  const createPayment = useCreatePayment()
  const {
    activeOrderItems,
    selectedTableId,
    addItem,
    removeItem,
    updateQuantity,
    clearOrder,
    setSelectedTableId,
  } = useOrderStore()

  const [menuOpen, setMenuOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null)

  const selectedTable = tables?.find((t) => t.id === selectedTableId) ?? null
  const total = activeOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function handleSelectTable(id: string) {
    setSelectedTableId(selectedTableId === id ? null : id)
  }

  function handleAddToOrder(item: MenuItem) {
    addItem({ menuItemId: item.id, name: item.name, price: item.price })
    toast.success(`${item.name} added to order`)
    setMenuOpen(false)
  }

  function handleSendToKitchen() {
    if (!selectedTableId || activeOrderItems.length === 0) return

    createOrder.mutate(
      {
        tableId: selectedTableId,
        items: activeOrderItems.map((item) => ({
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          notes: item.notes,
        })),
      },
      {
        onSuccess: () => {
          toast.success('Order sent to kitchen')
          clearOrder()
        },
        onError: () => {
          toast.error('Failed to send order')
        },
      },
    )
  }

  async function handlePay() {
    if (!selectedTableId || activeOrderItems.length === 0) return

    try {
      const order = await createOrder.mutateAsync({
        tableId: selectedTableId,
        items: activeOrderItems.map((item) => ({
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          notes: item.notes,
        })),
      })
      setCreatedOrderId(order.id)
      setPaymentOpen(true)
    } catch {
      toast.error('Failed to create order')
    }
  }

  function handlePaymentConfirm(data: CreatePaymentDto) {
    createPayment.mutate(data, {
      onSuccess: () => {
        toast.success('Payment processed')
        setPaymentOpen(false)
        clearOrder()
      },
      onError: () => {
        toast.error('Payment failed')
      },
    })
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Select Table</h2>
          {tables && (
            <span className="text-sm text-text-tertiary">
              {tables.filter((t) => t.status === 'available').length} available
            </span>
          )}
        </div>

        {tablesLoading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-gradient-to-br from-border-subtle to-border-default/50" />
            ))}
          </div>
        )}

        {tablesError && (
          <div className="flex items-center justify-center py-24">
            <p className="text-lg font-medium text-text-tertiary">Failed to load tables</p>
          </div>
        )}

        {!tablesLoading && !tablesError && !tables?.length && (
          <div className="flex items-center justify-center py-24">
            <p className="text-lg font-medium text-text-tertiary">No tables configured</p>
          </div>
        )}

        {!tablesLoading && !tablesError && tables && tables.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {tables.map((table) => (
              <button
                key={table.id}
                type="button"
                onClick={() => handleSelectTable(table.id)}
                className={cn(
                  'card-hover cursor-pointer rounded-xl border-2 p-4 text-left transition-all',
                  selectedTableId === table.id
                    ? 'border-brand-600 bg-gradient-to-br from-brand-50 to-brand-100/50 shadow-elevated'
                    : 'border-border-subtle bg-surface-card hover:border-brand-400',
                  table.status === 'occupied' && selectedTableId !== table.id && 'animate-glow-pulse',
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-text-primary">T{table.number}</div>
                  <Circle
                    className={cn(
                      'size-3 fill-current',
                      table.status === 'available' && 'text-green-500',
                      table.status === 'occupied' && 'text-red-400',
                      table.status === 'reserved' && 'text-amber-400',
                    )}
                  />
                </div>
                <div className="mt-1 text-sm text-text-secondary">Cap: {table.capacity}</div>
                <div
                  className={cn(
                    'mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium',
                    table.status === 'available' && 'bg-green-100 text-green-700',
                    table.status === 'occupied' && 'bg-red-100 text-red-700',
                    table.status === 'reserved' && 'bg-amber-100 text-amber-700',
                  )}
                >
                  {table.status}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-full lg:w-80 shrink-0">
        <div className="sticky top-24 glass-strong rounded-2xl">
          {!selectedTable ? (
            <div className="flex flex-col items-center gap-4 p-10 text-center text-text-tertiary">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200">
                <ShoppingCart className="size-8 text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary">Select a table</p>
                <p className="mt-1 text-xs text-text-tertiary">to start ordering</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-border-subtle/60 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-brand text-white text-sm font-bold shadow-sm">
                    {selectedTable.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary">Table {selectedTable.number}</h3>
                    <p className="text-xs text-text-tertiary">Table Order</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTableId(null)
                    clearOrder()
                  }}
                  className="cursor-pointer rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-surface-alt hover:text-text-primary"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto px-5 py-4">
                {activeOrderItems.length === 0 ? (
                  <p className="py-6 text-center text-sm text-text-tertiary">No items yet</p>
                ) : (
                  <ul className="space-y-3">
                    {activeOrderItems.map((item) => (
                      <li
                        key={item.menuItemId}
                        className="animate-slide-up flex items-center justify-between gap-2 rounded-xl border border-border-subtle bg-surface-card px-3 py-2.5"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-text-primary">
                            {item.name}
                          </p>
                          <div className="mt-1 flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                              className="cursor-pointer rounded-md p-0.5 text-text-tertiary transition-colors hover:bg-surface-alt hover:text-text-primary"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="flex size-5 items-center justify-center rounded bg-surface-alt text-xs font-medium text-text-secondary">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                              className="cursor-pointer rounded-md p-0.5 text-text-tertiary transition-colors hover:bg-surface-alt hover:text-text-primary"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-text-primary">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.menuItemId)}
                            className="cursor-pointer rounded-lg p-1 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-border-subtle/60 px-5 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-text-secondary">Total</span>
                  <span className="text-xl font-bold text-gradient-brand">
                    {formatCurrency(total)}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    className="btn flex w-full items-center justify-center gap-2 border-2 border-dashed border-border-default bg-transparent px-4 py-2.5 text-sm font-medium text-text-secondary hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50/50"
                  >
                    <Plus className="size-4" />
                    Add Item
                  </button>

                  {activeOrderItems.length > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={handleSendToKitchen}
                        disabled={createOrder.isPending}
                        className="btn flex w-full items-center justify-center gap-2 bg-gradient-brand px-4 py-2.5 text-sm font-medium text-text-inverse shadow-sm hover:shadow-md disabled:opacity-50"
                      >
                        <Send className="size-4" />
                        Send to Kitchen
                      </button>
                      <button
                        type="button"
                        onClick={handlePay}
                        disabled={createOrder.isPending}
                        className="btn flex w-full items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-sm font-medium text-text-inverse shadow-sm hover:shadow-md disabled:opacity-50"
                      >
                        <CreditCard className="size-4" />
                        Pay
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <MenuSelectionModal
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelect={handleAddToOrder}
        items={menuItems}
      />

      <PaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        total={total}
        orderId={createdOrderId ?? ''}
        onConfirm={handlePaymentConfirm}
        isProcessing={createPayment.isPending}
      />
    </div>
  )
}
