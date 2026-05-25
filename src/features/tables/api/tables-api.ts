import { client } from '@shared/api/client'
import type { Table, TableFilters } from '../types'

const BASE = '/tables'

export const tablesApi = {
  list: (params?: TableFilters) =>
    client.get<Table[]>(BASE, { params }).then(r => r.data),
  updateStatus: (id: string, status: string) =>
    client.patch<Table>(`${BASE}/${id}/status`, { status }).then(r => r.data),
}
