import axios from 'axios'

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public details?: Record<string, string[]>,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function parseAxiosError(error: unknown): AppError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined
    return new AppError(
      (data?.code as string) ?? 'UNKNOWN_ERROR',
      (data?.message as string) ?? error.message,
      error.response?.status ?? 500,
      data?.details as Record<string, string[]> | undefined,
    )
  }
  if (error instanceof AppError) return error
  return new AppError('UNKNOWN_ERROR', 'An unexpected error occurred', 500)
}
