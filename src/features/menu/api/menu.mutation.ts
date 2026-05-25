import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { menuApi } from './menu-api'
import { queryKeys } from './menu.query'
import type { CreateMenuItemDto, UpdateMenuItemDto } from '../types'

export function useCreateMenuItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateMenuItemDto) => menuApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      toast.success('Menu item created')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create menu item')
    },
  })
}

export function useUpdateMenuItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMenuItemDto }) =>
      menuApi.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.detail(variables.id) })
      toast.success('Menu item updated')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update menu item')
    },
  })
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => menuApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all })
      toast.success('Menu item deleted')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete menu item')
    },
  })
}
