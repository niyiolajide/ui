'use client'

import { InputHTMLAttributes, useState, useId } from 'react'
import { cn } from '../cn'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'subtle'
  density?: 'default' | 'compact'
}

export default function Input({
  label,
  error,
  helperText,
  variant = 'default',
  density = 'default',
  className,
  id,
  type,
  'aria-describedby': externalDescribedBy,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const reactId = useId()
  const inputId = id || reactId
  const errorId = `${inputId}-error`
  const helperTextId = `${inputId}-helper`
  const isPassword = type === 'password'
  const variants = {
    default: '',
    subtle: 'bg-neutral-50 dark:bg-neutral-800/50 focus:bg-white dark:focus:bg-neutral-800',
  }
  const densities = {
    default: '',
    compact: 'px-3 py-2 text-sm',
  }

  const describedBy = [
    error ? errorId : null,
    helperText && !error ? helperTextId : null,
    externalDescribedBy,
  ].filter(Boolean).join(' ') || undefined

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="label">
          {label}{props.required && <span className="text-error-500 ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={isPassword && showPassword ? 'text' : type}
          className={cn('input', variants[variant], densities[density], error && 'input-error', isPassword && 'pr-10', className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-800"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && <p id={errorId} className="mt-1 text-sm text-error-500" role="alert">{error}</p>}
      {helperText && !error && <p id={helperTextId} className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{helperText}</p>}
    </div>
  )
}
