import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { tablesApi } from './tables-api'
import { queryKeys } from './tables.query'

export function useUpdateTableStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      tablesApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update table status')
    },
  })
}
