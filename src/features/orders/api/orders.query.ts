import { useQuery } from '@tanstack/react-query'
import { ordersApi } from './orders-api'
import type { OrderFilters } from '../types'

export const queryKeys = {
  all: ['orders'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters?: OrderFilters) => [...queryKeys.lists(), filters] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
}

export function useOrderList(filters?: OrderFilters) {
  return useQuery({
    queryKey: queryKeys.list(filters),
    queryFn: () => ordersApi.list(filters),
  })
}

export function useOrderDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => ordersApi.byId(id),
    enabled: !!id,
  })
}
