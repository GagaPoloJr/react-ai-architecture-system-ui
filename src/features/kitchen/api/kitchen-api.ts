import { client } from '@shared/api/client'
import type { KitchenOrder, KitchenFilters } from '../types'

const BASE = '/kitchen'

export const kitchenApi = {
  list: (params?: KitchenFilters) =>
    client.get<KitchenOrder[]>(BASE, { params }).then(r => r.data),
  updateStatus: (orderId: string, status: KitchenOrder['status']) =>
    client.patch<KitchenOrder>(`${BASE}/${orderId}/status`, { status }).then(r => r.data),
}
