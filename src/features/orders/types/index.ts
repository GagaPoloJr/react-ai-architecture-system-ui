export interface OrderItem {
  menuItemId: string
  name: string
  price: number
  quantity: number
  notes?: string
}

export interface Order {
  id: string
  tableId: string
  items: OrderItem[]
  status: 'pending' | 'preparing' | 'served' | 'paid'
  total: number
  createdAt: string
}

export interface CreateOrderDto {
  tableId: string
  items: { menuItemId: string; name: string; price: number; quantity: number; notes?: string }[]
}

export interface OrderFilters {
  status?: string
  tableId?: string
  date?: string
}
