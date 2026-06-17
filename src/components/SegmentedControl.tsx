'use client'

import { useId } from 'react'

interface SegmentedControlOption<T extends string> {
  value: T
  label: string
  icon?: React.ReactNode
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel: string
  size?: 'sm' | 'md'
  className?: string
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  size = 'md',
  className = '',
}: SegmentedControlProps<T>) {
  const id = useId()

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`inline-flex rounded-lg bg-neutral-100 dark:bg-neutral-700 p-0.5 ${className}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          role="tab"
          id={`${id}-tab-${option.value}`}
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
          className={`inline-flex items-center gap-1.5 rounded-md font-medium transition-colors ${
            size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'
          } ${
            value === option.value
              ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-sm'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
          }`}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  )
}
