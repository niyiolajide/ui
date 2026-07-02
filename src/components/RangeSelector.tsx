'use client'

import Link from 'next/link'
import { cn } from '../cn'

export interface RangeOption<T extends string = string> {
  key: T
  label: string
  /** Window length in days; omit for open-ended options like "all". */
  days?: number
}

export const DEFAULT_RANGES: RangeOption[] = [
  { key: '7d', label: '7d', days: 7 },
  { key: '30d', label: '30d', days: 30 },
  { key: '90d', label: '90d', days: 90 },
  { key: '1y', label: '1y', days: 365 },
  { key: 'all', label: 'All' },
]

/** Days for a range key, `fallback` when the key is unknown or open-ended ("all"). */
export function rangeToDays<T extends string>(
  key: T | undefined,
  options: RangeOption<T>[] = DEFAULT_RANGES as RangeOption<T>[],
  fallback = 30
): number {
  return options.find((r) => r.key === key)?.days ?? fallback
}

const SEGMENT =
  'inline-flex items-center rounded-md font-medium transition-colors'
const SEGMENT_ACTIVE = 'bg-surface text-neutral-900 dark:text-neutral-50 shadow-sm'
const SEGMENT_IDLE =
  'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'

/**
 * Standard time-window control. Two flavors:
 * - `hrefFor`: renders links (server-friendly, range lives in the URL — takes precedence)
 * - `onChange`: renders a controlled tablist (range lives in client state)
 * Visual language matches SegmentedControl.
 */
export function RangeSelector<T extends string>({
  value,
  options = DEFAULT_RANGES as RangeOption<T>[],
  ariaLabel = 'Time range',
  size = 'md',
  className,
  onChange,
  hrefFor,
}: {
  value: T
  options?: RangeOption<T>[]
  ariaLabel?: string
  size?: 'sm' | 'md'
  className?: string
  onChange?: (key: T) => void
  hrefFor?: (key: T) => string
}) {
  const sizeCls = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'
  const wrap = cn('inline-flex rounded-lg bg-neutral-100 dark:bg-neutral-700 p-0.5', className)
  const segCls = (active: boolean) => cn(SEGMENT, sizeCls, active ? SEGMENT_ACTIVE : SEGMENT_IDLE)

  if (hrefFor) {
    return (
      <nav aria-label={ariaLabel} className={wrap}>
        {options.map((r) => (
          <Link
            key={r.key}
            href={hrefFor(r.key)}
            scroll={false}
            aria-current={r.key === value ? 'true' : undefined}
            className={segCls(r.key === value)}
          >
            {r.label}
          </Link>
        ))}
      </nav>
    )
  }

  return (
    <div role="tablist" aria-label={ariaLabel} className={wrap}>
      {options.map((r) => (
        <RangeTab key={r.key} option={r} selected={r.key === value} onChange={onChange} className={segCls(r.key === value)} />
      ))}
    </div>
  )
}

function RangeTab<T extends string>({
  option,
  selected,
  onChange,
  className,
}: {
  option: RangeOption<T>
  selected: boolean
  onChange?: (key: T) => void
  className: string
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={() => {
        onChange?.(option.key)
      }}
      className={className}
    >
      {option.label}
    </button>
  )
}
