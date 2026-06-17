import { type LucideIcon, ArrowRight, Inbox } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export default function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  const renderIcon = () => {
    if (!icon) return null
    const IconComponent = icon
    return (
      <div className="mb-4 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-primary-400" strokeWidth={1.5} />
        </div>
      </div>
    )
  }

  return (
    <div className="text-center py-12">
      {renderIcon()}
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm mx-auto">{description}</p>
      {actionLabel && actionHref && (
        <a href={actionHref} className="btn btn-primary inline-flex items-center gap-2">
          {actionLabel}
          <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  )
}
