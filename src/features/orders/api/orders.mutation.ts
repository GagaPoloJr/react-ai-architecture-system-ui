import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ordersApi } from './orders-api'
import { queryKeys } from './orders.query'
import type { CreateOrderDto } from '../types'

export function useCreateOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateOrderDto) => ordersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      toast.success('Order created')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create order')
    },
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      ordersApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      toast.success('Order status updated')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update order status')
    },
  })
}
