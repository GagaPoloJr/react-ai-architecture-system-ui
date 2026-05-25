export interface Table {
  id: string
  number: number
  capacity: number
  status: 'available' | 'occupied' | 'reserved'
}

export interface TableFilters {
  status?: string
}
