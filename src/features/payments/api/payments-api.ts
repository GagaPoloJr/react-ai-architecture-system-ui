import { client } from '@shared/api/client'
import type { Payment, CreatePaymentDto } from '../types'

const BASE = '/payments'

export const paymentsApi = {
  create: (data: CreatePaymentDto) =>
    client.post<Payment>(BASE, data).then(r => r.data),
  byOrder: (orderId: string) =>
    client.get<Payment[]>(`${BASE}/order/${orderId}`).then(r => r.data),
}
