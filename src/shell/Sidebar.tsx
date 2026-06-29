'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentType } from 'react'
import * as Icons from 'lucide-react'
import { cn } from '../cn'

export interface NavItem {
  href: string
  label: string
  icon?: string
}
export interface NavGroup {
  label?: string
  items: NavItem[]
}

const ICONS = Icons as unknown as Record<string, ComponentType<{ className?: string }>>

function iconFor(name: string | undefined): ComponentType<{ className?: string }> {
  return ICONS[name ?? ''] ?? Icons.Dot
}

/** Shared left nav. Active state from the current pathname. */
export default function Sidebar({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname() || ''
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav className="flex flex-col gap-5 p-3">
      {groups.map((g, gi) => (
        <div key={gi} className="flex flex-col gap-0.5">
          {g.label && <p className="px-3 pb-1 meta-label">{g.label}</p>}
          {g.items.map((item) => {
            const Icon = iconFor(item.icon)
            const active = isActive(item.href)
            return (
              // Next <Link> (not raw <a>) so the app's basePath is auto-prepended
              // (e.g. /dashboard → /finpulse/dashboard); raw hrefs would 404 at the origin root.
              <Link
                key={item.href}
                href={item.href}
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
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
