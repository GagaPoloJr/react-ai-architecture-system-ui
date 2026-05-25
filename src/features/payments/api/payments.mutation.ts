import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { paymentsApi } from './payments-api'
import { queryKeys } from './payments.query'
import type { CreatePaymentDto } from '../types'

export function useCreatePayment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreatePaymentDto) => paymentsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      toast.success('Payment processed')
    },
    onError: (error) => {
      toast.error(error.message || 'Payment failed')
    },
  })
}
