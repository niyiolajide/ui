import type { HTMLAttributes } from 'react'
import { cn } from '../cn'

// Token-ized loading placeholders (SH-1). A neutral base with a soft highlight that
// sweeps across via `animate-shimmer` (defined in the preset; auto-stilled under
// prefers-reduced-motion by the preset's base layer). Server-component safe — no hooks.
// Always token colors (neutral-*/white) so the design-guard stays green.

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

const radius = { sm: 'rounded', md: 'rounded-md', lg: 'rounded-lg', full: 'rounded-full' }

export default function Skeleton({ className, rounded = 'md', ...props }: SkeletonProps) {
  return (
    <div
      className={cn('relative isolate overflow-hidden bg-neutral-200 dark:bg-neutral-700 h-4 w-full', radius[rounded], className)}
      aria-hidden="true"
      {...props}
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10" />
    </div>
  )
}

/** A block of N text lines; the last line is shortened so it reads like a paragraph. */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn('h-3.5', i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full')} />
      ))}
    </div>
  )
}

/** Card-shaped placeholder (avatar/icon + title + subtitle) for list/grid loading. */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('card', className)} aria-hidden="true">
      <div className="flex items-center gap-3">
        <Skeleton rounded="lg" className="h-10 w-10 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  )
}

/** StatCard-shaped placeholder — mirrors `StatCard` so dashboards don't reflow on load. */
export function SkeletonStat({ className }: { className?: string }) {
  return (
    <div className={cn('card', className)} aria-hidden="true">
      <div className="flex items-start gap-3">
        <Skeleton rounded="lg" className="h-9 w-9 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-7 w-28" />
        </div>
      </div>
    </div>
  )
}

/** Table-row placeholder; first column is narrower to read like a label column. */
export function SkeletonTable({ rows = 5, cols = 4, className }: { rows?: number; cols?: number; className?: string }) {
  return (
    <div className={cn('w-full space-y-3', className)} aria-hidden="true">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className={cn('h-4', c === 0 ? 'w-1/4' : 'flex-1')} />
          ))}
        </div>
      ))}
    </div>
  )
}
