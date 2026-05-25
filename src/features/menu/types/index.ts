export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: 'food' | 'beverage' | 'snack'
  imageUrl: string | null
  isAvailable: boolean
  createdAt: string
}

export interface CreateMenuItemDto {
  name: string
  description: string
  price: number
  category: 'food' | 'beverage' | 'snack'
  imageUrl?: string | null
  isAvailable?: boolean
}

export type UpdateMenuItemDto = Partial<CreateMenuItemDto>

export interface MenuItemFilters {
  category?: string
  isAvailable?: boolean
  search?: string
}
