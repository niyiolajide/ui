'use client'

import { Search, CornerDownLeft } from 'lucide-react'
import {
  usePaletteController,
  type PaletteCommand,
  type PaletteSection,
  type PaletteControllerOptions,
} from './CommandPalette.hooks'

/**
 * ⌘K command palette (design-system generalization of FinPulse's, per UX review R4).
 * Searches the app-provided `commands` (resolved nav + quick actions — the server
 * layout resolves them from the control bus; this client component can't) plus a
 * cross-app jump index derived from the registry `apps` (readApps() output): every
 * other app and its web-surface nav become "AppName · Screen" entries that navigate
 * with a full page load. Fuzzy subsequence match, full keyboard nav (⌘K/↑/↓/Enter/Esc).
 * Render into the AppShell topbar `actions` slot.
 */
export function CommandPalette(props: PaletteControllerOptions & { placeholder?: string }) {
  const {
    open,
    setOpen,
    query,
    setQuery,
    active,
    setActive,
    inputRef,
    listRef,
    close,
    results,
    grouped,
    select,
    onListKey,
  } = usePaletteController(props)

  return (
    <>
      <PaletteTrigger onOpen={() => { setOpen(true); }} />

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-ink/50 p-4 pt-[12vh]">
          <button type="button" aria-label="Close command palette" className="absolute inset-0 cursor-default" onClick={close} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            tabIndex={-1}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-surface shadow-elevated"
          >
            <PaletteInput
              inputRef={inputRef}
              query={query}
              placeholder={props.placeholder ?? 'Search…'}
              onQueryChange={setQuery}
              onKeyDown={onListKey}
            />
            <PaletteResults
              listRef={listRef}
              results={results}
              grouped={grouped}
              active={active}
              onActivate={setActive}
              onSelect={select}
            />
          </div>
        </div>
      )}
    </>
  )
}

function PaletteTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open command palette"
      className="flex items-center gap-2 rounded-lg border border-line bg-canvas px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-ink"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-xs sm:inline">⌘K</kbd>
    </button>
  )
}

function PaletteInput({
  inputRef,
  query,
  placeholder,
  onQueryChange,
  onKeyDown,
}: {
  inputRef: React.RefObject<HTMLInputElement>
  query: string
  placeholder: string
  onQueryChange: (v: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
}) {
  return (
    <div className="flex items-center gap-2 border-b border-line px-4">
      <Search className="h-4 w-4 shrink-0 text-muted" />
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => { onQueryChange(e.target.value); }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label="Search commands"
        className="w-full bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-muted"
      />
      <kbd className="hidden shrink-0 rounded border border-line bg-canvas px-1.5 py-0.5 font-mono text-xs text-muted sm:inline">Esc</kbd>
    </div>
  )
}

function PaletteResults({
  listRef,
  results,
  grouped,
  active,
  onActivate,
  onSelect,
}: {
  listRef: React.RefObject<HTMLUListElement>
  results: PaletteCommand[]
  grouped: PaletteSection[]
  active: number
  onActivate: (idx: number) => void
  onSelect: (cmd: PaletteCommand) => void
}) {
  return (
    <ul ref={listRef} className="max-h-[55vh] overflow-y-auto py-2">
      {results.length === 0 && <li className="px-4 py-8 text-center text-sm text-muted">No results</li>}
      {grouped.map((section) => (
        <li key={section.group}>
          <div className="px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-muted">{section.label}</div>
          <ul>
            {section.items.map(({ cmd, idx }) => (
              <li key={cmd.key}>
                <PaletteOption cmd={cmd} idx={idx} active={idx === active} onActivate={onActivate} onSelect={onSelect} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

function PaletteOption({
  cmd,
  idx,
  active,
  onActivate,
  onSelect,
}: {
  cmd: PaletteCommand
  idx: number
  active: boolean
  onActivate: (idx: number) => void
  onSelect: (cmd: PaletteCommand) => void
}) {
  return (
    <button
      type="button"
      data-idx={idx}
      aria-current={active ? 'true' : undefined}
      onMouseEnter={() => { onActivate(idx); }}
      onClick={() => { onSelect(cmd); }}
      className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors ${
        active ? 'bg-canvas text-ink' : 'text-muted hover:text-ink'
      }`}
    >
      <span className="flex items-center gap-2">
        <span className="text-ink">{cmd.label}</span>
        {cmd.hint && <span className="text-xs text-muted">{cmd.hint}</span>}
      </span>
      {active && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-muted" />}
    </button>
  )
}
