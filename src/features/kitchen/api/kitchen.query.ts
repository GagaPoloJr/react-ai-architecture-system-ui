import { useQuery } from '@tanstack/react-query'
import { kitchenApi } from './kitchen-api'
import type { KitchenFilters } from '../types'

export const queryKeys = {
  all: ['kitchen'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters?: KitchenFilters) => [...queryKeys.lists(), filters] as const,
}

export function useKitchenOrders(filters?: KitchenFilters) {
  return useQuery({
    queryKey: queryKeys.list(filters),
    queryFn: () => kitchenApi.list(filters),
    refetchInterval: 15_000,
  })
}
