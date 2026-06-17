'use client'

import { useState, useRef, useEffect } from 'react'
import { ShieldCheck, LogOut, ChevronDown, User as UserIcon } from 'lucide-react'

export interface ShellUser {
  email?: string
  name?: string
}

/** Account dropdown — consistent across apps: identity, System Admin (admin only),
 *  and a hub-centric Sign out. */
export default function UserMenu({
  user,
  isAdmin,
  hubUrl = 'http://localhost:4000',
  onSignOut,
}: {
  user?: ShellUser
  isAdmin?: boolean
  hubUrl?: string
  onSignOut?: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const signOut = onSignOut || (() => { window.location.href = `${hubUrl}/login` })
  const label = user?.name || user?.email || 'Account'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Account menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 p-1.5 pr-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300">
          <UserIcon className="w-4 h-4" />
        </span>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-56 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-elevated py-1 z-50">
          <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-700">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50 truncate">{label}</p>
            {user?.email && user?.name && <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>}
          </div>
          {isAdmin && (
            <a
              href={`${hubUrl}/admin`}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              System Admin
            </a>
          )}
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
