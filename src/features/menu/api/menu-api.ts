import { client } from '@shared/api/client'
import type { MenuItem, CreateMenuItemDto, UpdateMenuItemDto, MenuItemFilters } from '../types'

const BASE = '/menu'

export const menuApi = {
  list: (params?: MenuItemFilters) =>
    client.get<MenuItem[]>(BASE, { params }).then((r) => r.data),
  byId: (id: string) =>
    client.get<MenuItem>(`${BASE}/${id}`).then((r) => r.data),
  create: (data: CreateMenuItemDto) =>
    client.post<MenuItem>(BASE, data).then((r) => r.data),
  update: (id: string, data: UpdateMenuItemDto) =>
    client.patch<MenuItem>(`${BASE}/${id}`, data).then((r) => r.data),
  remove: (id: string) =>
    client.delete(`${BASE}/${id}`),
}
