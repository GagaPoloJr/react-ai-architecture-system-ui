import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { kitchenApi } from './kitchen-api'
import { queryKeys } from './kitchen.query'
import type { KitchenOrder } from '../types'

export function useUpdateKitchenStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: KitchenOrder['status'] }) =>
      kitchenApi.updateStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      toast.success('Kitchen order updated')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update kitchen order')
    },
  })
}
