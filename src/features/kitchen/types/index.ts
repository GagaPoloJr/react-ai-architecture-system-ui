export interface KitchenOrder {
  id: string
  tableNumber: number
  items: { name: string; quantity: number; notes?: string }[]
  status: 'pending' | 'preparing' | 'ready'
  createdAt: string
  notes?: string
}

export interface KitchenFilters {
  status?: string
  date?: string
}
