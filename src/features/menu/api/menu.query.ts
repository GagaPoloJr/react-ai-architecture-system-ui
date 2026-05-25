import { useQuery } from '@tanstack/react-query'
import { menuApi } from './menu-api'
import type { MenuItemFilters } from '../types'

export const queryKeys = {
  all: ['menu'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters?: MenuItemFilters) => [...queryKeys.lists(), filters] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
}

export function useMenuList(filters?: MenuItemFilters) {
  return useQuery({
    queryKey: queryKeys.list(filters),
    queryFn: () => menuApi.list(filters),
    staleTime: 60_000,
  })
}

export function useMenuItemDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => menuApi.byId(id),
    enabled: !!id,
  })
}
