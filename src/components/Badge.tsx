import { cn } from '../cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'error' | 'neutral' | 'info'
  size?: 'sm' | 'md'
  className?: string
}

export default function Badge({ children, variant = 'neutral', size = 'md', className }: BadgeProps) {
  const variants = {
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    neutral: 'badge-neutral',
    info: 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-3 py-1 text-xs',
  }

  return (
    <span className={cn('badge', sizes[size], variants[variant], className)}>
      {children}
    </span>
  )
}
