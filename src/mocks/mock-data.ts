import type { MenuItem } from '@features/menu/types'
import type { Order } from '@features/orders/types'
import type { Table } from '@features/tables/types'
import type { Payment } from '@features/payments/types'

export let menuItems: MenuItem[] = [
  { id: '1', name: 'Nasi Goreng', description: 'Fried rice with egg and vegetables', price: 30000, category: 'food', imageUrl: null, isAvailable: true, createdAt: new Date().toISOString() },
  { id: '2', name: 'Mie Goreng', description: 'Fried noodles with chicken and vegetables', price: 28000, category: 'food', imageUrl: null, isAvailable: true, createdAt: new Date().toISOString() },
  { id: '3', name: 'Sate Ayam', description: 'Chicken skewers with peanut sauce', price: 35000, category: 'food', imageUrl: null, isAvailable: true, createdAt: new Date().toISOString() },
  { id: '4', name: 'Gado-Gado', description: 'Indonesian salad with peanut dressing', price: 25000, category: 'food', imageUrl: null, isAvailable: true, createdAt: new Date().toISOString() },
  { id: '5', name: 'Rendang', description: 'Slow-cooked beef in coconut milk', price: 45000, category: 'food', imageUrl: null, isAvailable: true, createdAt: new Date().toISOString() },
  { id: '6', name: 'Es Teh Manis', description: 'Iced sweet tea', price: 5000, category: 'beverage', imageUrl: null, isAvailable: true, createdAt: new Date().toISOString() },
  { id: '7', name: 'Es Jeruk', description: 'Fresh orange juice', price: 8000, category: 'beverage', imageUrl: null, isAvailable: true, createdAt: new Date().toISOString() },
  { id: '8', name: 'Kopi Susu', description: 'Iced milk coffee', price: 15000, category: 'beverage', imageUrl: null, isAvailable: true, createdAt: new Date().toISOString() },
  { id: '9', name: 'Air Mineral', description: 'Bottled mineral water', price: 3000, category: 'beverage', imageUrl: null, isAvailable: true, createdAt: new Date().toISOString() },
  { id: '10', name: 'Pisang Goreng', description: 'Fried banana fritters', price: 10000, category: 'snack', imageUrl: null, isAvailable: true, createdAt: new Date().toISOString() },
  { id: '11', name: 'Tahu Goreng', description: 'Crispy fried tofu', price: 8000, category: 'snack', imageUrl: null, isAvailable: true, createdAt: new Date().toISOString() },
  { id: '12', name: 'Tempe Goreng', description: 'Crispy fried tempeh', price: 8000, category: 'snack', imageUrl: null, isAvailable: true, createdAt: new Date().toISOString() },
]

export let tables: Table[] = [
  { id: '1', number: 1, capacity: 2, status: 'available' },
  { id: '2', number: 2, capacity: 4, status: 'available' },
  { id: '3', number: 3, capacity: 4, status: 'occupied' },
  { id: '4', number: 4, capacity: 6, status: 'available' },
  { id: '5', number: 5, capacity: 2, status: 'reserved' },
  { id: '6', number: 6, capacity: 8, status: 'available' },
  { id: '7', number: 7, capacity: 4, status: 'available' },
  { id: '8', number: 8, capacity: 2, status: 'occupied' },
  { id: '9', number: 9, capacity: 6, status: 'available' },
  { id: '10', number: 10, capacity: 4, status: 'available' },
]

export let orders: Order[] = [
  { id: 'ord-1', tableId: '3', items: [{ menuItemId: '1', name: 'Nasi Goreng', price: 30000, quantity: 2 }, { menuItemId: '6', name: 'Es Teh Manis', price: 5000, quantity: 2 }], status: 'preparing', total: 70000, createdAt: new Date(Date.now() - 1800000).toISOString() },
  { id: 'ord-2', tableId: '8', items: [{ menuItemId: '5', name: 'Rendang', price: 45000, quantity: 1 }, { menuItemId: '10', name: 'Pisang Goreng', price: 10000, quantity: 3 }], status: 'pending', total: 75000, createdAt: new Date(Date.now() - 600000).toISOString() },
]

export let payments: Payment[] = [
  { id: 'pay-1', orderId: 'ord-1', amount: 70000, method: 'cash', status: 'completed', paidAt: new Date(Date.now() - 3600000).toISOString() },
]

export let menuIdCounter = 13
export let orderIdCounter = 3
export let paymentIdCounter = 2
