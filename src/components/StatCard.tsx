import { type LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: React.ReactNode
  value: string | number
  subtitle?: React.ReactNode
  highlight?: boolean
  highlightTone?: 'success' | 'warning' | 'neutral'
  icon?: LucideIcon
  trend?: { value: number; label: string }
  size?: 'default' | 'large'
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
  const isPositiveTrend = trend && trend.value > 0
  const isNegativeTrend = trend && trend.value < 0
  const resolvedTone: 'success' | 'warning' | 'neutral' | null = !highlight
    ? null
    : highlightTone || (isPositiveTrend ? 'success' : 'neutral')

  const toneClasses = resolvedTone === 'success'
    ? {
      card: 'bg-success-50/50 dark:bg-success-900/20',
      icon: 'bg-success-100 dark:bg-success-900/40 text-success-700 dark:text-success-400',
      value: 'text-success-700 dark:text-success-400',
    }
    : resolvedTone === 'warning'
      ? {
        card: 'bg-warning-50/50 dark:bg-warning-900/20',
        icon: 'bg-warning-100 dark:bg-warning-900/40 text-warning-700 dark:text-warning-400',
        value: 'text-warning-700 dark:text-warning-400',
      }
      : resolvedTone === 'neutral'
        ? {
          card: 'bg-neutral-50 dark:bg-neutral-800',
          icon: 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300',
          value: 'text-neutral-900 dark:text-neutral-50',
        }
        : {
          card: '',
          icon: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400',
          value: 'text-neutral-900 dark:text-neutral-50',
        }

  return (
    <div className={`card ${size === 'large' ? 'md:col-span-2' : ''} ${toneClasses.card}`}>
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
            {trend && (
              <span className={`inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full ${
                isPositiveTrend ? 'bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-400' : isNegativeTrend ? 'bg-error-50 dark:bg-error-900/30 text-error-700 dark:text-error-400' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
              }`}>
                {isPositiveTrend ? '\u2191' : isNegativeTrend ? '\u2193' : ''}{Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {(subtitle || trend?.label) && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{subtitle || trend?.label}</p>
          )}
        </div>
      </div>
    </div>
  )
}
