'use client'

import { useState, useId, type InputHTMLAttributes } from 'react'
import { cn } from '../cn'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'subtle'
  density?: 'default' | 'compact'
}

const INPUT_VARIANTS = {
  default: '',
  subtle: 'bg-surface-muted focus:bg-surface',
}

const INPUT_DENSITIES = {
  default: '',
  compact: 'px-3 py-2 text-sm',
}

function PasswordToggle({
  showPassword,
  onToggle,
}: {
  showPassword: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-800"
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  )
}

function describedByIds({
  errorId,
  helperTextId,
  externalDescribedBy,
  hasError,
  hasHelperText,
}: {
  errorId: string
  helperTextId: string
  externalDescribedBy: string | undefined
  hasError: boolean
  hasHelperText: boolean
}): string | undefined {
  const ids = [hasError ? errorId : null, hasHelperText ? helperTextId : null, externalDescribedBy]
  return ids.filter(Boolean).join(' ') || undefined
}

function InputLabel({
  inputId,
  label,
  required,
}: {
  inputId: string
  label?: string
  required: boolean
}) {
  if (label === undefined) {
    return null
  }

  return (
    <label htmlFor={inputId} className="label">
      {label}{required && <span className="text-error-500 ml-0.5" aria-hidden="true">*</span>}
    </label>
  )
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
  const inputId = id ?? reactId
  const errorId = `${inputId}-error`
  const helperTextId = `${inputId}-helper`
  const isPassword = type === 'password'
  const describedBy = describedByIds({
    errorId,
    helperTextId,
    externalDescribedBy,
    hasError: error !== undefined,
    hasHelperText: helperText !== undefined && error === undefined,
  })

  return (
    <div>
      <InputLabel inputId={inputId} label={label} required={props.required === true} />
      <div className="relative">
        <input
          id={inputId}
          type={isPassword && showPassword ? 'text' : type}
          className={cn('input', INPUT_VARIANTS[variant], INPUT_DENSITIES[density], error && 'input-error', isPassword && 'pr-10', className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {isPassword && (
          <PasswordToggle
            showPassword={showPassword}
            onToggle={() => { setShowPassword((prev) => !prev); }}
          />
        )}
      </div>
      {error && <p id={errorId} className="mt-1 text-sm text-error-500" role="alert">{error}</p>}
      {helperText && !error && <p id={helperTextId} className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{helperText}</p>}
    </div>
  )
}
