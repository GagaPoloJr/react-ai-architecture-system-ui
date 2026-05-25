import { useQuery } from '@tanstack/react-query'
import { tablesApi } from './tables-api'
import type { TableFilters } from '../types'

export const queryKeys = {
  all: ['tables'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters?: TableFilters) => [...queryKeys.lists(), filters] as const,
}

export function useTableList(filters?: TableFilters) {
  return useQuery({
    queryKey: queryKeys.list(filters),
    queryFn: () => tablesApi.list(filters),
    staleTime: 60_000,
  })
}
