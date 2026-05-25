import { client } from '@shared/api/client'
import type { Order, CreateOrderDto, OrderFilters } from '../types'

const BASE = '/orders'

export const ordersApi = {
  list: (params?: OrderFilters) =>
    client.get<Order[]>(BASE, { params }).then(r => r.data),
  byId: (id: string) =>
    client.get<Order>(`${BASE}/${id}`).then(r => r.data),
  create: (data: CreateOrderDto) =>
    client.post<Order>(BASE, data).then(r => r.data),
  updateStatus: (id: string, status: string) =>
    client.patch<Order>(`${BASE}/${id}/status`, { status }).then(r => r.data),
}
