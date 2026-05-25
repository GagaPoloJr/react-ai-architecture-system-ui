import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export function RouteErrorFallback() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-gray-900">{error.status}</h1>
        <p className="text-muted-foreground text-gray-500">{error.statusText}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Reload
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4">
      <p className="text-gray-500">Something went wrong</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
      >
        Reload
      </button>
    </div>
  )
}
