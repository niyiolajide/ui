import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '../cn'

export interface BreadcrumbItem {
  label: string
  /** Omit on the current (last) crumb. */
  href?: string
}

/** Breadcrumb trail rendered by AppShell above the page content. Crumbs with an
 *  href are Next <Link>s (basePath auto-prepended); the last crumb is the current
 *  page (aria-current). */
export default function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  if (items.length === 0) {return null}
  const last = items.length - 1
  return (
    <nav aria-label="Breadcrumb" className={cn('mb-4', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" aria-hidden />}
            {item.href && i !== last ? (
              <Link
                href={item.href}
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={i === last ? 'page' : undefined}
                className="font-medium text-neutral-900 dark:text-neutral-50"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
