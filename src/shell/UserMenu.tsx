'use client'

import { useState, useRef, useEffect, type RefObject } from 'react'
import { ShieldCheck, LogOut, ChevronDown, User as UserIcon } from 'lucide-react'

export interface ShellUser {
  email?: string
  name?: string
}

function useOutsideDismiss(ref: RefObject<HTMLDivElement>, onDismiss: () => void): void {
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {onDismiss()}
    }
    document.addEventListener('mousedown', h)
    return () => { document.removeEventListener('mousedown', h); }
  }, [ref, onDismiss])
}

function UserMenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Account menu"
      aria-expanded={open}
      className="flex items-center gap-1.5 p-1.5 pr-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300">
        <UserIcon className="w-4 h-4" />
      </span>
      <ChevronDown className="w-3.5 h-3.5" />
    </button>
  )
}

function UserMenuDropdown({
  user,
  isAdmin,
  hubUrl,
  signOut,
}: {
  user?: ShellUser
  isAdmin?: boolean
  hubUrl: string
  signOut: () => void
}) {
  const label = user?.name ?? user?.email ?? 'Account'
  const showEmail = user?.email !== undefined && user.name !== undefined

  return (
    <div className="absolute right-0 mt-1 w-56 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-surface shadow-elevated py-1 z-50">
      <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-700">
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50 truncate">{label}</p>
        {showEmail && <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>}
      </div>
      {isAdmin && (
        <a
          href={`${hubUrl}/admin`}
          className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-surface-muted transition-colors"
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
  )
}

/** Account dropdown — consistent across apps: identity, System Admin (admin only),
 *  and a hub-centric Sign out. */
export default function UserMenu({
  user,
  isAdmin,
  hubUrl = '',
  onSignOut,
}: {
  user?: ShellUser
  isAdmin?: boolean
  hubUrl?: string
  onSignOut?: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const dismiss = () => { setOpen(false); }
  const signOut = onSignOut ?? (() => { window.location.href = `${hubUrl}/logout`; })

  useOutsideDismiss(ref, dismiss)

  return (
    <div ref={ref} className="relative">
      <UserMenuButton open={open} onToggle={() => { setOpen((value) => !value); }} />
      {open && <UserMenuDropdown user={user} isAdmin={isAdmin} hubUrl={hubUrl} signOut={signOut} />}
    </div>
  )
}
