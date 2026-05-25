import { useQuery } from '@tanstack/react-query'
import { paymentsApi } from './payments-api'

export const queryKeys = {
  all: ['payments'] as const,
  byOrder: (orderId: string) => ['payments', 'byOrder', orderId] as const,
}

export function usePaymentByOrder(orderId: string) {
  return useQuery({
    queryKey: queryKeys.byOrder(orderId),
    queryFn: () => paymentsApi.byOrder(orderId),
    enabled: !!orderId,
  })
}
