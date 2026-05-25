import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@shared/utils/cn'
import { Save, X } from 'lucide-react'
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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2',
            'rounded-xl bg-white p-6 shadow-lg',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          )}
        >
          <div className="mb-6 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              {isEdit ? 'Edit Menu Item' : 'Add Menu Item'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="cursor-pointer rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={cn(
                  'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1',
                  errors.name
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                )}
                placeholder="Item name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                {...register('description')}
                className={cn(
                  'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1',
                  errors.description
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                )}
                placeholder="Item description"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Price (IDR)
              </label>
              <input
                id="price"
                type="number"
                step="any"
                {...register('price')}
                className={cn(
                  'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1',
                  errors.price
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                )}
                placeholder="30000"
              />
              {errors.price && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                {...register('category')}
                className={cn(
                  'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1',
                  'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                )}
              >
                <option value="food">Food</option>
                <option value="beverage">Beverage</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('isAvailable')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Available
              </span>
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className={cn(
                    'cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors',
                    'hover:bg-gray-50',
                  )}
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors',
                  'bg-blue-600 hover:bg-blue-700',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                )}
              >
                <Save className="h-4 w-4" />
                {isEdit ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
