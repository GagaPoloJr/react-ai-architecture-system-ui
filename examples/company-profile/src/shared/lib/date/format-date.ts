import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns'

export function formatDate(date: Date | string, pattern = 'dd/MM/yyyy') {
  return format(new Date(date), pattern)
}

export function formatRelative(date: Date | string) {
  const d = new Date(date)
  if (isToday(d)) return formatDistanceToNow(d, { addSuffix: true })
  if (isYesterday(d)) return 'Yesterday'
  return formatDate(d)
}
