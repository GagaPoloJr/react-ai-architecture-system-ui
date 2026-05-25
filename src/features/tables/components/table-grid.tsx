import { toast } from 'sonner'
import { useTableList } from '@features/tables'
import { TableCard } from './table-card'
import { Button } from '@shared/ui/atoms'
import { RefreshCw } from 'lucide-react'
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
          className="h-32 animate-pulse rounded-xl bg-gradient-to-br from-border-subtle to-border-default/50"
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-text-primary">Failed to load tables</p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => {
              toast.error('Failed to load tables')
              refetch()
            }}
          >
            <RefreshCw className="size-4" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (!tables?.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium text-text-tertiary">No tables configured</p>
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
