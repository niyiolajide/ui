import { AlertTriangle, Inbox } from 'lucide-react'
import { cn } from '../cn'

interface PageErrorStateProps {
  message: string
  onRetry?: () => void
  retryLabel?: string
  className?: string
}

interface PageEmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function PageErrorState({
  message,
  onRetry,
  retryLabel = 'Try again',
  className,
}: PageErrorStateProps) {
  return (
    <div className={cn('rounded-lg border border-error-200 dark:border-error-800 bg-error-50 dark:bg-error-900/30 p-4', className)} role="alert">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 text-error-700 dark:text-error-400" />
          <p className="text-sm text-error-700 dark:text-error-400">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="shrink-0 text-sm font-medium text-error-700 dark:text-error-400 hover:text-error-800 dark:hover:text-error-300 underline"
          >
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  )
}

export function PageEmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: PageEmptyStateProps) {
  return (
    <div className={cn('rounded-lg border border-neutral-200 dark:border-neutral-700 bg-surface p-8 text-center', className)}>
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-700">
        <Inbox className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
      </div>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      {actionLabel && actionHref && (
        <a href={actionHref} className="mt-5 inline-flex items-center rounded-md bg-primary-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-600">
          {actionLabel}
        </a>
      )}
    </div>
  )
}
