import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../cn'

interface StatCardProps {
  label: ReactNode
  value: string | number
  subtitle?: ReactNode
  highlight?: boolean
  highlightTone?: 'success' | 'warning' | 'neutral'
  icon?: LucideIcon
  trend?: { value: number; label: string }
  size?: 'default' | 'large'
}

type Tone = 'success' | 'warning' | 'neutral'

const DEFAULT_TONE_CLASSES = {
  card: '',
  icon: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400',
  value: 'text-neutral-900 dark:text-neutral-50',
}

const TONE_CLASSES: Record<Tone, typeof DEFAULT_TONE_CLASSES> = {
  success: {
    card: 'bg-success-50/50 dark:bg-success-900/20',
    icon: 'bg-success-100 dark:bg-success-900/40 text-success-700 dark:text-success-400',
    value: 'text-success-700 dark:text-success-400',
  },
  warning: {
    card: 'bg-warning-50/50 dark:bg-warning-900/20',
    icon: 'bg-warning-100 dark:bg-warning-900/40 text-warning-700 dark:text-warning-400',
    value: 'text-warning-700 dark:text-warning-400',
  },
  neutral: {
    card: 'bg-surface-muted',
    icon: 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300',
    value: 'text-neutral-900 dark:text-neutral-50',
  },
}

function renderable(node: ReactNode): boolean {
  return node !== undefined && node !== null && node !== false
}

function resolveTone(highlight: boolean, highlightTone: Tone | undefined, isPositiveTrend: boolean): Tone | null {
  if (!highlight) {
    return null
  }
  return highlightTone ?? (isPositiveTrend ? 'success' : 'neutral')
}

function TrendPill({
  trend,
  isPositive,
  isNegative,
}: {
  trend: { value: number; label: string }
  isPositive: boolean
  isNegative: boolean
}) {
  const trendClass = isPositive
    ? 'bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-400'
    : isNegative
      ? 'bg-error-50 dark:bg-error-900/30 text-error-700 dark:text-error-400'
      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'

  return (
    <span className={cn('inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full', trendClass)}>
      {isPositive ? '\u2191' : isNegative ? '\u2193' : ''}{Math.abs(trend.value)}%
    </span>
  )
}

export default function StatCard({
  label,
  value,
  subtitle,
  highlight = false,
  highlightTone,
  icon: Icon,
  trend,
  size = 'default',
}: StatCardProps) {
  const isPositiveTrend = trend !== undefined && trend.value > 0
  const isNegativeTrend = trend !== undefined && trend.value < 0
  const resolvedTone = resolveTone(highlight, highlightTone, isPositiveTrend)
  const toneClasses = resolvedTone ? TONE_CLASSES[resolvedTone] : DEFAULT_TONE_CLASSES
  const supportingText = subtitle ?? trend?.label

  return (
    <div className={cn('card', size === 'large' && 'md:col-span-2', toneClasses.card)}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={`p-2 rounded-lg ${toneClasses.icon}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className={`${size === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'} font-bold tabular-nums ${toneClasses.value}`}>
              {value}
            </p>
            {trend !== undefined && (
              <TrendPill trend={trend} isPositive={isPositiveTrend} isNegative={isNegativeTrend} />
            )}
          </div>
          {renderable(supportingText) && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{supportingText}</p>
          )}
        </div>
      </div>
    </div>
  )
}
