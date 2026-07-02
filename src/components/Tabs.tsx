'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { cn } from '../cn'
import Badge from './Badge'

export interface TabItem<T extends string = string> {
  key: T
  label: string
  /** Renders the tab as a Next <Link>; active state then comes from the route. */
  href?: string
  /** Route tabs match by prefix by default; set for index routes like "/" that must match exactly. */
  exact?: boolean
  icon?: ReactNode
  /** Count badge — rendered only when > 0. */
  badge?: number
  badgeVariant?: 'success' | 'warning' | 'error' | 'neutral' | 'info'
}

interface TabsProps<T extends string> {
  items: TabItem<T>[]
  /** Controlled active key for state-driven tabs (href items derive it from the route instead). */
  value?: T
  onChange?: (key: T) => void
  ariaLabel?: string
  size?: 'sm' | 'md'
  className?: string
}

const SIZES = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3 py-2 text-sm',
}

const tabClass = (active: boolean, size: 'sm' | 'md') =>
  cn(
    '-mb-px inline-flex items-center gap-1.5 border-b-2 font-medium transition-colors',
    SIZES[size],
    active
      ? 'border-primary-600 dark:border-primary-400 text-primary-700 dark:text-primary-300'
      : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-600'
  )

const isRouteActive = (pathname: string, href: string, exact?: boolean) =>
  exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)

function TabContent({ item }: { item: TabItem }) {
  return (
    <>
      {item.icon}
      {item.label}
      {item.badge ? (
        <Badge variant={item.badgeVariant ?? 'info'} size="sm">
          {item.badge}
        </Badge>
      ) : null}
    </>
  )
}

/**
 * Underline tab strip — the design-system home for both flavors of tab bar:
 * route-aware page tabs (items with `href`, active from the pathname, rendered
 * as Next <Link>s so basePath is auto-prepended) and controlled state tabs
 * (`value`/`onChange`). Count badges per tab render only when > 0.
 */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
  size = 'md',
  className = '',
}: TabsProps<T>) {
  const pathname = usePathname() || ''
  const allLinks = items.every((i) => i.href)

  const strip = items.map((item) => {
    if (item.href) {
      const active = isRouteActive(pathname, item.href, item.exact)
      return (
        <Link
          key={item.key}
          href={item.href}
          aria-current={active ? 'page' : undefined}
          className={tabClass(active, size)}
        >
          <TabContent item={item} />
        </Link>
      )
    }
    const active = value === item.key
    return (
      <button
        key={item.key}
        type="button"
        role={allLinks ? undefined : 'tab'}
        aria-selected={active}
        onClick={() => onChange?.(item.key)}
        className={tabClass(active, size)}
      >
        <TabContent item={item} />
      </button>
    )
  })

  const stripClass = cn('flex flex-wrap items-end gap-1 border-b border-line', className)
  return allLinks ? (
    <nav aria-label={ariaLabel} className={stripClass}>
      {strip}
    </nav>
  ) : (
    <div role="tablist" aria-label={ariaLabel} className={stripClass}>
      {strip}
    </div>
  )
}
