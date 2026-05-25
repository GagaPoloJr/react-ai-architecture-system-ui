import { forwardRef } from 'react'
import { cn } from '@shared/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          className={cn('input-field', className)}
          {...props}
        />
        {error && (
          <p className="flex items-center gap-1 text-xs text-red-600">
            <span className="size-1 rounded-full bg-red-600 shrink-0" />
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs text-text-tertiary">{helperText}</p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
