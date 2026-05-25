import type { AxiosInstance, AxiosResponse } from 'axios'
import { menuItems, tables, orders, payments, menuIdCounter, orderIdCounter, paymentIdCounter } from './mock-data'
import type { MenuItem } from '@features/menu/types'
import type { Order, OrderItem } from '@features/orders/types'
import type { Table } from '@features/tables/types'
import type { Payment } from '@features/payments/types'
import type { KitchenOrder } from '@features/kitchen/types'

let _menuItems = [...menuItems]
let _tables = [...tables]
let _orders = [...orders]
let _payments = [...payments]
let _menuIdCounter = menuIdCounter
let _orderIdCounter = orderIdCounter
let _paymentIdCounter = paymentIdCounter

function getSearchParams(url: string): Record<string, string> {
  const idx = url.indexOf('?')
  if (idx === -1) return {}
  const params: Record<string, string> = {}
  new URLSearchParams(url.slice(idx)).forEach((v, k) => { params[k] = v })
  return params
}

export function setupMockInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(async (config) => {
    const url = config.url ?? ''
    const method = (config.method ?? 'get').toLowerCase()
    const urlParams = getSearchParams(url)
    const queryParams = { ...urlParams, ...config.params } as Record<string, string>
    const path = url.split('?')[0]!

    try {
      const result = await handleRequest(method, path, queryParams, config.data)
      if (result) {
        config.adapter = () => Promise.resolve(result)
      }
    } catch {
      // passthrough to real server
    }

    return config
  })
}

async function handleRequest(
  method: string,
  path: string,
  params: Record<string, string>,
  body: unknown,
): Promise<AxiosResponse | null> {
  if (method === 'get' && path === '/menu') {
    let filtered = [..._menuItems]
    if (params.category && params.category !== 'all') {
      filtered = filtered.filter((m) => m.category === params.category)
    }
    if (params.search) {
      const q = params.search.toLowerCase()
      filtered = filtered.filter((m) => m.name.toLowerCase().includes(q))
    }
    return { data: filtered, status: 200, statusText: 'OK', headers: {}, config: {} as never }
  }

  if (method === 'get' && (path.match(/^\/menu\/(.+)$/))) {
    const id = path.match(/^\/menu\/(.+)$/)![1]!
    const item = _menuItems.find((m) => m.id === id)
    if (!item) return null
    return { data: item, status: 200, statusText: 'OK', headers: {}, config: {} as never }
  }

  if (method === 'post' && path === '/menu') {
    const data = body as Partial<MenuItem>
    const newItem: MenuItem = {
      id: String(_menuIdCounter++),
      name: data.name ?? '',
      description: data.description ?? '',
      price: data.price ?? 0,
      category: data.category ?? 'food',
      imageUrl: data.imageUrl ?? null,
      isAvailable: data.isAvailable ?? true,
      createdAt: new Date().toISOString(),
    }
    _menuItems.unshift(newItem)
    return { data: newItem, status: 201, statusText: 'Created', headers: {}, config: {} as never }
  }

  if (method === 'patch' && (path.match(/^\/menu\/(.+)$/))) {
    const id = path.match(/^\/menu\/(.+)$/)![1]!
    const idx = _menuItems.findIndex((m) => m.id === id)
    if (idx === -1) return null
    const data = body as Partial<MenuItem>
    _menuItems[idx] = { ..._menuItems[idx]!, ...data } as MenuItem
    return { data: _menuItems[idx], status: 200, statusText: 'OK', headers: {}, config: {} as never }
  }

  if (method === 'delete' && (path.match(/^\/menu\/(.+)$/))) {
    const id = path.match(/^\/menu\/(.+)$/)![1]!
    const idx = _menuItems.findIndex((m) => m.id === id)
    if (idx === -1) return null
    _menuItems.splice(idx, 1)
    return { data: null, status: 204, statusText: 'No Content', headers: {}, config: {} as never }
  }

  if (method === 'get' && path === '/tables') {
    let filtered = [..._tables]
    if (params.status) {
      filtered = filtered.filter((t) => t.status === params.status)
    }
    return { data: filtered, status: 200, statusText: 'OK', headers: {}, config: {} as never }
  }

  if (method === 'patch' && (path.match(/^\/tables\/(.+)\/status$/))) {
    const id = path.match(/^\/tables\/(.+)\/status$/)![1]!
    const idx = _tables.findIndex((t) => t.id === id)
    if (idx === -1) return null
    const data = body as { status: string }
    _tables[idx] = { ..._tables[idx]!, status: data.status as Table['status'] }
    return { data: _tables[idx], status: 200, statusText: 'OK', headers: {}, config: {} as never }
  }

  if (method === 'get' && path === '/orders') {
    let filtered = [..._orders]
    if (params.status) filtered = filtered.filter((o) => o.status === params.status)
    if (params.tableId) filtered = filtered.filter((o) => o.tableId === params.tableId)
    return { data: filtered, status: 200, statusText: 'OK', headers: {}, config: {} as never }
  }

  if (method === 'get' && (path.match(/^\/orders\/(.+)$/))) {
    const id = path.match(/^\/orders\/(.+)$/)![1]!
    const order = _orders.find((o) => o.id === id)
    if (!order) return null
    return { data: order, status: 200, statusText: 'OK', headers: {}, config: {} as never }
  }

  if (method === 'post' && path === '/orders') {
    const data = body as { tableId: string; items: OrderItem[] }
    const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const newOrder: Order = {
      id: `ord-${_orderIdCounter++}`,
      tableId: data.tableId,
      items: data.items,
      status: 'pending',
      total,
      createdAt: new Date().toISOString(),
    }
    _orders.unshift(newOrder)
    const tableIdx = _tables.findIndex((t) => t.id === data.tableId)
    if (tableIdx !== -1) {
      _tables[tableIdx] = { ..._tables[tableIdx]!, status: 'occupied' }
    }
    return { data: newOrder, status: 201, statusText: 'Created', headers: {}, config: {} as never }
  }

  if (method === 'patch' && (path.match(/^\/orders\/(.+)\/status$/))) {
    const id = path.match(/^\/orders\/(.+)\/status$/)![1]!
    const idx = _orders.findIndex((o) => o.id === id)
    if (idx === -1) return null
    const data = body as { status: string }
    _orders[idx] = { ..._orders[idx]!, status: data.status as Order['status'] }
    return { data: _orders[idx], status: 200, statusText: 'OK', headers: {}, config: {} as never }
  }

  if (method === 'post' && path === '/payments') {
    const data = body as { orderId: string; amount: number; method: string }
    const newPayment: Payment = {
      id: `pay-${_paymentIdCounter++}`,
      orderId: data.orderId,
      amount: data.amount,
      method: data.method as Payment['method'],
      status: 'completed',
      paidAt: new Date().toISOString(),
    }
    _payments.unshift(newPayment)
    const orderIdx = _orders.findIndex((o) => o.id === data.orderId)
    if (orderIdx !== -1) {
      _orders[orderIdx] = { ..._orders[orderIdx]!, status: 'paid' }
    }
    return { data: newPayment, status: 201, statusText: 'Created', headers: {}, config: {} as never }
  }

  if (method === 'get' && (path.match(/^\/payments\/order\/(.+)$/))) {
    const orderId = path.match(/^\/payments\/order\/(.+)$/)![1]!
    const payment = _payments.find((p) => p.orderId === orderId)
    if (!payment) return null
    return { data: payment, status: 200, statusText: 'OK', headers: {}, config: {} as never }
  }

  if (method === 'get' && path === '/kitchen') {
    const kitchenOrders: KitchenOrder[] = _orders
      .filter((o) => o.status === 'pending' || o.status === 'preparing')
      .map((o) => {
        const table = _tables.find((t) => t.id === o.tableId)
        return {
          id: o.id,
          tableNumber: table?.number ?? 0,
          items: o.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            notes: item.notes,
          })),
          status: o.status as KitchenOrder['status'],
          createdAt: o.createdAt,
        }
      })
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    return { data: kitchenOrders, status: 200, statusText: 'OK', headers: {}, config: {} as never }
  }

  if (method === 'patch' && (path.match(/^\/kitchen\/(.+)\/status$/))) {
    const orderId = path.match(/^\/kitchen\/(.+)\/status$/)![1]!
    const idx = _orders.findIndex((o) => o.id === orderId)
    if (idx === -1) return null
    const data = body as { status: KitchenOrder['status'] }
    _orders[idx] = { ..._orders[idx]!, status: data.status as Order['status'] }
    const order = _orders[idx]!
    const table = _tables.find((t) => t.id === order.tableId)
    const kitchenOrder: KitchenOrder = {
      id: order.id,
      tableNumber: table?.number ?? 0,
      items: order.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        notes: item.notes,
      })),
      status: data.status,
      createdAt: order.createdAt,
    }
    return { data: kitchenOrder, status: 200, statusText: 'OK', headers: {}, config: {} as never }
  }

  return null
}
