import { useState } from 'react'
import { toast } from 'sonner'
import { Plus, Minus, Send, CreditCard, Trash2, ShoppingCart, X } from 'lucide-react'
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
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />
      <div
        className={cn(
          'fixed left-1/2 top-1/2 z-50 max-h-[80vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'overflow-y-auto rounded-xl bg-white p-6 shadow-2xl',
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <ShoppingCart className="size-5" />
            Add Item
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100"
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
                'cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                category === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              )}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {filtered
            .filter((m) => m.isAvailable)
            .map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                className="cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-left text-sm transition-all hover:border-gray-400"
              >
                <span className="block font-medium">{item.name}</span>
                <span className="block text-xs text-gray-500">
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
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Select Table</h2>

        {tablesLoading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-gray-200" />
            ))}
          </div>
        )}

        {tablesError && (
          <div className="flex items-center justify-center py-24">
            <p className="text-lg font-medium text-gray-500">Failed to load tables</p>
          </div>
        )}

        {!tablesLoading && !tablesError && !tables?.length && (
          <div className="flex items-center justify-center py-24">
            <p className="text-lg font-medium text-gray-500">No tables configured</p>
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
                    'cursor-pointer rounded-xl border-2 p-4 text-left transition-all',
                    selectedTableId === table.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 bg-white hover:border-gray-300',
                  )}
              >
                <div className="text-xl font-bold">T{table.number}</div>
                <div className="mt-1 text-sm text-gray-500">Cap: {table.capacity}</div>
                <div
                  className={cn(
                    'mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium',
                    table.status === 'available' && 'bg-green-100 text-green-700',
                    table.status === 'occupied' && 'bg-amber-100 text-amber-700',
                    table.status === 'reserved' && 'bg-blue-100 text-blue-700',
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
        <div className="sticky top-24 rounded-xl border border-gray-200 bg-white shadow-sm">
          {!selectedTable ? (
            <div className="flex flex-col items-center gap-3 p-8 text-center text-gray-400">
              <ShoppingCart className="size-12" />
              <p className="text-sm font-medium">Select a table to start ordering</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <h3 className="font-bold text-gray-900">Table {selectedTable.number}</h3>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTableId(null)
                    clearOrder()
                  }}
                  className="cursor-pointer rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto px-4 py-3">
                {activeOrderItems.length === 0 ? (
                  <p className="py-4 text-center text-sm text-gray-400">No items yet</p>
                ) : (
                  <ul className="space-y-3">
                    {activeOrderItems.map((item) => (
                      <li key={item.menuItemId} className="flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <div className="mt-0.5 flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                              className="cursor-pointer rounded p-0.5 text-gray-400 transition-colors hover:text-gray-600"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-4 text-center text-xs font-medium text-gray-600">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                              className="cursor-pointer rounded p-0.5 text-gray-400 transition-colors hover:text-gray-600"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.menuItemId)}
                            className="cursor-pointer rounded p-1 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-gray-200 px-4 py-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-600">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(total)}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Send className="size-4" />
                        Send to Kitchen
                      </button>
                      <button
                        type="button"
                        onClick={handlePay}
                        disabled={createOrder.isPending}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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
