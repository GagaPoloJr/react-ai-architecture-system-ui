import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface OrderItem {
  menuItemId: string
  name: string
  price: number
  quantity: number
  notes?: string
}

interface OrderState {
  activeOrderItems: OrderItem[]
  selectedTableId: string | null
  addItem: (item: { menuItemId: string; name: string; price: number; notes?: string }) => void
  removeItem: (menuItemId: string) => void
  updateQuantity: (menuItemId: string, qty: number) => void
  clearOrder: () => void
  setSelectedTableId: (id: string | null) => void
}

export const useOrderStore = create<OrderState>()(
  devtools(
    (set) => ({
      activeOrderItems: [],
      selectedTableId: null,

      addItem: (item) =>
        set((state) => {
          const existing = state.activeOrderItems.find((i) => i.menuItemId === item.menuItemId)
          if (existing) {
            return {
              activeOrderItems: state.activeOrderItems.map((i) =>
                i.menuItemId === item.menuItemId ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            }
          }
          return { activeOrderItems: [...state.activeOrderItems, { ...item, quantity: 1 }] }
        }),

      removeItem: (menuItemId) =>
        set((state) => ({
          activeOrderItems: state.activeOrderItems.filter((i) => i.menuItemId !== menuItemId),
        })),

      updateQuantity: (menuItemId, qty) =>
        set((state) => {
          if (qty <= 0) {
            return { activeOrderItems: state.activeOrderItems.filter((i) => i.menuItemId !== menuItemId) }
          }
          return {
            activeOrderItems: state.activeOrderItems.map((i) =>
              i.menuItemId === menuItemId ? { ...i, quantity: qty } : i,
            ),
          }
        }),

      clearOrder: () => set({ activeOrderItems: [], selectedTableId: null }),

      setSelectedTableId: (id) => set({ selectedTableId: id }),
    }),
    { name: 'order-store' },
  ),
)
