import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog } from '@shared/ui/molecules/dialog'
import { Button, Input } from '@shared/ui/atoms'
import { Save } from 'lucide-react'
import { menuItemSchema, type MenuItemFormValues } from '../schemas'
import type { MenuItem, CreateMenuItemDto, UpdateMenuItemDto } from '../types'

interface MenuFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: MenuItem
  onSubmit: (data: CreateMenuItemDto | UpdateMenuItemDto) => void
}

const defaultValues: MenuItemFormValues = {
  name: '',
  description: '',
  price: 0,
  category: 'food',
  imageUrl: null,
  isAvailable: true,
}

export function MenuFormDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}: MenuFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues,
  })

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        category: initialData.category,
        imageUrl: initialData.imageUrl,
        isAvailable: initialData.isAvailable,
      })
    } else {
      reset(defaultValues)
    }
  }, [initialData, reset, open])

  const isEdit = !!initialData

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? 'Edit Menu Item' : 'Add Menu Item'}
    >
      <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-4">
        <Input
          label="Name"
          placeholder="Item name"
          error={errors.name?.message}
          {...register('name')}
        />

        <div className="space-y-1.5">
          <label htmlFor="description" className="block text-sm font-medium text-text-primary">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            {...register('description')}
            className="input-field"
            placeholder="Item description"
          />
          {errors.description && (
            <p className="text-xs text-red-600">{errors.description.message}</p>
          )}
        </div>

        <Input
          label="Price (IDR)"
          type="number"
          step="any"
          placeholder="30000"
          error={errors.price?.message}
          {...register('price')}
        />

        <div className="space-y-1.5">
          <label htmlFor="category" className="block text-sm font-medium text-text-primary">
            Category
          </label>
          <select
            id="category"
            {...register('category')}
            className="input-field"
          >
            <option value="food">Food</option>
            <option value="beverage">Beverage</option>
            <option value="snack">Snack</option>
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('isAvailable')}
            className="size-4 rounded border-border-default text-brand-600 focus:ring-brand-600"
          />
          <span className="text-sm font-medium text-text-primary">Available</span>
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            <Save className="size-4" />
            {isEdit ? 'Update' : 'Save'}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
