'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

// Generalized from FinPulse's CommandPalette.hooks (the R4 reference implementation):
// commands are provided by the app (resolved nav + quick actions), cross-app targets
// are derived from the registry apps the caller passes in (readApps() output — this
// client component cannot touch the control bus itself).

export interface PaletteCommand {
  key: string
  label: string
  hint?: string
  /** Section key; undefined lands in the default "Go to" section. */
  group?: string
  /** In-app destination — navigated with router.push (basePath applies). */
  href?: string
  /** Absolute cross-app destination — navigated with a full page load. */
  url?: string
}

export interface PaletteAppNavItem {
  key: string
  label: string
  href: string
  surfaces?: string[]
}

/** Registry app shape the palette indexes for cross-app jumps (readApps() output). */
export interface PaletteApp {
  key: string
  name: string
  url: string
  nav?: PaletteAppNavItem[]
}

export interface PaletteSection {
  group: string
  label: string
  items: { cmd: PaletteCommand; idx: number }[]
}

const DEFAULT_GROUP = 'general'
const APPS_GROUP = 'apps'
export const DEFAULT_GROUP_LABELS: Record<string, string> = {
  [DEFAULT_GROUP]: 'Go to',
  actions: 'Quick actions',
  [APPS_GROUP]: 'Other apps',
}

/** Cross-app jump commands: every other app itself + its registry nav (web surface). */
export function appJumpCommands(apps: PaletteApp[], currentKey?: string): PaletteCommand[] {
  const out: PaletteCommand[] = []
  for (const app of apps) {
    if (app.key === currentKey) {continue}
    out.push({ key: `app:${app.key}`, label: app.name, hint: 'open app', group: APPS_GROUP, url: app.url })
    for (const item of app.nav ?? []) {
      if (item.surfaces && !item.surfaces.includes('web')) {continue}
      out.push({
        key: `app:${app.key}:${item.key}`,
        label: `${app.name} · ${item.label}`,
        group: APPS_GROUP,
        url: app.url.replace(/\/$/, '') + item.href,
      })
    }
  }
  return out
}

/** Fuzzy subsequence match; returns a score (lower = better) or -1 for no match. */
export function fuzzyScore(query: string, text: string): number {
  if (!query) {return 0}
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  let ti = 0
  let score = 0
  let lastMatch = -1
  for (let qi = 0; qi < q.length; qi++) {
    const found = t.indexOf(q[qi], ti)
    if (found === -1) {return -1}
    // Reward contiguous matches; penalize gaps.
    score += found - ti + (lastMatch >= 0 && found === lastMatch + 1 ? 0 : 1)
    lastMatch = found
    ti = found + 1
  }
  return score
}

function usePaletteState(defaultOpen: boolean) {
  const [open, setOpen] = useState(defaultOpen)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActive(0)
  }, [])

  // ⌘K / Ctrl+K to toggle; also accept the `open-command-palette` event.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    function onEvent() {
      setOpen(true)
    }
    document.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onEvent)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onEvent)
    }
  }, [])

  useEffect(() => {
    if (open) {
      // Focus after paint so the dialog is in the DOM.
      const id = requestAnimationFrame(() => inputRef.current?.focus())
      return () => { cancelAnimationFrame(id); }
    }
  }, [open])
  return { open, setOpen, query, setQuery, active, setActive, inputRef, listRef, close }
}

function useCommandResults(commands: PaletteCommand[], query: string) {
  const results = useMemo(() => {
    const scored = commands
      .map((c) => ({ cmd: c, score: fuzzyScore(query, `${c.label} ${c.hint ?? ''}`) }))
      .filter((r) => r.score >= 0)
    scored.sort((a, b) => a.score - b.score)
    return scored.map((r) => r.cmd)
  }, [query, commands])
  return results
}

function useGrouped(results: PaletteCommand[], groupLabels: Record<string, string>, groupOrder?: string[]) {
  return useMemo<PaletteSection[]>(() => {
    const byGroup = new Map<string, { cmd: PaletteCommand; idx: number }[]>()
    results.forEach((cmd, idx) => {
      const g = cmd.group ?? DEFAULT_GROUP
      const items = byGroup.get(g)
      if (items === undefined) {
        byGroup.set(g, [{ cmd, idx }])
      } else {
        items.push({ cmd, idx })
      }
    })
    const order = groupOrder ?? Array.from(byGroup.keys())
    const seen = new Set<string>()
    const groups = [...order.filter((g) => byGroup.has(g)), ...Array.from(byGroup.keys())].filter((g) => {
      if (seen.has(g)) {return false}
      seen.add(g)
      return true
    })
    return groups.map((g) => ({ group: g, label: groupLabels[g] ?? g, items: byGroup.get(g) ?? [] }))
  }, [results, groupLabels, groupOrder])
}

function useSelectCommand(close: () => void) {
  const router = useRouter()
  return useCallback(
    (cmd: PaletteCommand | undefined) => {
      if (!cmd) {return}
      close()
      if (cmd.url) {
        window.location.assign(cmd.url)
      } else if (cmd.href) {
        router.push(cmd.href)
      }
    },
    [close, router],
  )
}

function useListKey({ active, setActive, results, select, close }: { active: number; setActive: (updater: (active: number) => number) => void; results: PaletteCommand[]; select: (cmd: PaletteCommand | undefined) => void; close: () => void }) {
  return function onListKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      select(results[active])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close()
    }
  }
}

function useBoundedActive(resultsLength: number, setActive: (updater: (active: number) => number) => void) {
  useEffect(() => {
    setActive((a) => (a >= resultsLength ? 0 : a))
  }, [resultsLength, setActive])
}

function useActiveScroll({ open, active, listRef }: { open: boolean; active: number; listRef: React.RefObject<HTMLUListElement | null> }) {
  useEffect(() => {
    if (!open || !listRef.current) {return}
    const el = listRef.current.querySelector<HTMLElement>(`[data-idx="${active}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [active, open, listRef])
}

export interface PaletteControllerOptions {
  commands: PaletteCommand[]
  apps?: PaletteApp[]
  currentKey?: string
  groupLabels?: Record<string, string>
  groupOrder?: string[]
  defaultOpen?: boolean
}

export function usePaletteController({ commands, apps, currentKey, groupLabels, groupOrder, defaultOpen = false }: PaletteControllerOptions) {
  const state = usePaletteState(defaultOpen)
  const all = useMemo(
    () => [...commands, ...appJumpCommands(apps ?? [], currentKey)],
    [commands, apps, currentKey],
  )
  const results = useCommandResults(all, state.query)
  const grouped = useGrouped(results, { ...DEFAULT_GROUP_LABELS, ...groupLabels }, groupOrder)
  useBoundedActive(results.length, state.setActive)
  const select = useSelectCommand(state.close)
  const onListKey = useListKey({ active: state.active, setActive: state.setActive, results, select, close: state.close })
  useActiveScroll({ open: state.open, active: state.active, listRef: state.listRef })

  return { ...state, results, grouped, select, onListKey }
}
