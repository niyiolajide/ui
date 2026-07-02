'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ComponentType } from 'react'
import * as Icons from 'lucide-react'
import { cn } from '../cn'
import Badge from '../components/Badge'

export interface NavItem {
  href: string
  label: string
  icon?: string
  /** Optional count/status pill at the row's right edge (e.g. unread notifications). */
  badge?: string | number
}
export interface NavGroup {
  label?: string
  items: NavItem[]
  /** Labeled groups only: the label becomes a toggle that collapses the group. */
  collapsible?: boolean
  /** Start collapsed. Ignored while the group contains the active route. */
  defaultCollapsed?: boolean
}

const ICONS = Icons as unknown as Record<string, ComponentType<{ className?: string }>>

function iconFor(name: string | undefined): ComponentType<{ className?: string }> {
  return ICONS[name ?? ''] ?? Icons.Dot
}

// Active state must match on the path alone: hrefs may legitimately carry a query or
// hash (e.g. RetirementPulse's ?v= scenario carrying via hrefDecorator).
function pathOnly(href: string): string {
  return href.split('#')[0].split('?')[0]
}

/** Shared left nav. Active state from the current pathname. */
export default function Sidebar({
  groups,
  hrefDecorator,
}: {
  groups: NavGroup[]
  /**
   * Rewrite each item's href just before render (append query params, etc.).
   * Active-state matching uses the path only, so query/hash decoration never
   * breaks highlighting.
   */
  hrefDecorator?: (href: string) => string
}) {
  const pathname = usePathname() || ''
  // User toggles override defaultCollapsed; a group holding the active route stays open.
  const [toggled, setToggled] = useState<Record<number, boolean | undefined>>({})

  return (
    <nav className="flex flex-col gap-5 p-3">
      {groups.map((g, gi) => (
        <SidebarGroup
          key={gi}
          group={g}
          pathname={pathname}
          hrefDecorator={hrefDecorator}
          toggled={toggled[gi]}
          onToggle={(next) => {
            setToggled((t) => ({ ...t, [gi]: next }))
          }}
        />
      ))}
    </nav>
  )
}

function SidebarGroup({
  group: g,
  pathname,
  hrefDecorator,
  toggled,
  onToggle,
}: {
  group: NavGroup
  pathname: string
  hrefDecorator?: (href: string) => string
  toggled: boolean | undefined
  onToggle: (next: boolean) => void
}) {
  const isActive = (href: string) => {
    const path = pathOnly(href)
    return pathname === path || pathname.startsWith(path + '/')
  }
  const decorated = g.items.map((item) => ({
    item,
    href: hrefDecorator ? hrefDecorator(item.href) : item.href,
  }))
  const containsActive = decorated.some(({ href }) => isActive(href))
  const collapsible = Boolean(g.collapsible && g.label)
  const collapsed = collapsible && !containsActive && (toggled ?? g.defaultCollapsed ?? false)

  return (
    <div className="flex flex-col gap-0.5">
      {g.label &&
        (collapsible ? (
          <button
            type="button"
            aria-expanded={!collapsed}
            onClick={() => {
              onToggle(!collapsed)
            }}
            className="flex items-center justify-between px-3 pb-1 meta-label hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
          >
            {g.label}
            <Icons.ChevronDown className={cn('w-3.5 h-3.5 transition-transform', collapsed && '-rotate-90')} />
          </button>
        ) : (
          <p className="px-3 pb-1 meta-label">{g.label}</p>
        ))}
      {!collapsed &&
        decorated.map(({ item, href }) => (
          <SidebarLink key={item.href} item={item} href={href} active={isActive(href)} />
        ))}
    </div>
  )
}

function SidebarLink({ item, href, active }: { item: NavItem; href: string; active: boolean }) {
  const Icon = iconFor(item.icon)
  return (
    // Next <Link> (not raw <a>) so the app's basePath is auto-prepended
    // (e.g. /dashboard → /finpulse/dashboard); raw hrefs would 404 at the origin root.
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-50'
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {item.label}
      {item.badge !== undefined && item.badge !== '' && (
        <Badge size="sm" variant="info" className="ml-auto">
          {item.badge}
        </Badge>
      )}
    </Link>
  )
}
