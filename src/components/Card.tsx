import { cn } from '../cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title?: string
  hoverable?: boolean
  variant?: 'default' | 'compact' | 'outlined' | 'tinted' | 'elevated' | 'interactive'
  className?: string
}

export default function Card({
  children,
  title,
  hoverable = false,
  variant = 'default',
  className,
  ...rest
}: CardProps) {
  const variants = {
    default: 'card',
    compact: 'card p-4',
    outlined: 'bg-white dark:bg-neutral-800 rounded-card border border-neutral-200 dark:border-neutral-700 p-6',
    tinted: 'bg-neutral-50 dark:bg-neutral-800/50 rounded-card border border-neutral-200 dark:border-neutral-700 p-6 shadow-none',
    elevated: 'card shadow-elevated',
    interactive: 'card cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-primary-500',
  }

  return (
    <div className={cn(variants[variant], hoverable && 'card-hover cursor-pointer', className)} {...rest}>
      {title && (
        <h3 className="section-title mb-4">{title}</h3>
      )}
      {children}
    </div>
  )
}
