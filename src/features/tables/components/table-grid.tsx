import { toast } from 'sonner'
import { cn } from '@shared/utils/cn'
import { useTableList } from '@features/tables'
import { TableCard } from './table-card'
import type { TableFilters } from '@features/tables/types'

interface TableGridProps {
  filters?: TableFilters
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-32 animate-pulse rounded-xl bg-gray-200"
        />
      ))}
    </div>
  )
}

export function TableGrid({ filters }: TableGridProps) {
  const { data: tables, isLoading, isError, refetch } = useTableList(filters)

  if (isLoading) {
    return <SkeletonGrid />
  }

  if (isError) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">Failed to load tables</p>
          <button
            type="button"
            onClick={() => {
              toast.error('Failed to load tables')
              refetch()
            }}
            className={cn(
              'mt-4 cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white',
              'hover:bg-gray-800',
            )}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!tables?.length) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <p className="text-lg font-medium text-gray-500">No tables configured</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {tables.map((table) => (
        <TableCard key={table.id} table={table} />
      ))}
    </div>
  )
}
