export interface Payment {
  id: string
  orderId: string
  amount: number
  method: 'cash' | 'card' | 'qris'
  status: 'pending' | 'completed' | 'failed'
  paidAt: string
}

export interface CreatePaymentDto {
  orderId: string
  amount: number
  method: 'cash' | 'card' | 'qris'
}
