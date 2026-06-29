'use client'

import { useState, useRef, useEffect, type ComponentType } from 'react'
import * as Icons from 'lucide-react'
import { LayoutGrid } from 'lucide-react'
import { cn } from '../cn'

export interface AppInfo {
  key: string
  name: string
  url: string
  icon?: string
}

const ICONS = Icons as unknown as Record<string, ComponentType<{ className?: string }>>

function iconFor(name: string | undefined): ComponentType<{ className?: string }> {
  return ICONS[name ?? ''] ?? Icons.AppWindow
}

/** Cross-app launcher — lists every sibling app from the registry. Present in every shell. */
export default function AppSwitcher({ apps, currentKey }: { apps: AppInfo[]; currentKey?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {setOpen(false)}
    }
    document.addEventListener('mousedown', h)
    return () => { document.removeEventListener('mousedown', h); }
  }, [])

  if (apps.length === 0) {return null}

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => { setOpen((o) => !o); }}
        aria-label="Switch app"
        aria-expanded={open}
        className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <LayoutGrid className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-64 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-surface shadow-elevated p-2 z-50">
          <p className="px-2 py-1 meta-label">Apps</p>
          <div className="grid grid-cols-2 gap-1">
            {apps.map((a) => {
              const Icon = iconFor(a.icon)
              const active = a.key === currentKey
              return (
                <a
                  key={a.key}
                  href={a.url}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-lg p-3 text-center text-xs font-medium transition-colors',
                    active
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {a.name}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
