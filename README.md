# @niyi/ui

Shared design system for the sibling apps (HealthPulse, FinPulse, PropertyPulse, LifeOS, auth-hub).
One source of truth for tokens, base CSS layers, and React primitives — so the apps look and
feel like one product family and can't drift.

## Consume (per app)

1. `package.json`: `"@niyi/ui": "github:niyiolajide/ui#<commit-sha>"` (immutable pin; prebuilt
   `dist/` is committed — no compile-on-install).
2. `tailwind.config.js`:
   ```js
   module.exports = {
     presets: [require('@niyi/ui/tailwind-preset')],
     content: [
       './src/**/*.{ts,tsx}',
       './node_modules/@niyi/ui/dist/**/*.js', // REQUIRED — or shared components render unstyled
     ],
   }
   ```
3. `globals.css` (after the `@tailwind` directives): `@import '@niyi/ui/styles.css';`
4. `layout.tsx`: load fonts via `next/font/google` → `--font-body` (Plus Jakarta Sans) +
   `--font-display` (DM Serif Display); wrap in `ThemeProvider`; render `<ThemeScript />` (from
   `@niyi/ui`) in `<head>` for no-FOUC dark mode — do NOT copy-paste an inline script.
5. Use the primitives + semantic tokens; never raw `slate-*`/hex/inline styles. For neutrals that
   adapt to dark mode, use the `ground-*` ramp or the `surface`/`ink`/`muted`/`line` semantic
   tokens — never a per-app forked `--*-slate-*` ramp.

## Dark-mode-aware semantic tokens (preset)
All flip automatically under `.dark` — one class, both modes (no app-local ramp):
- **Neutral ramp:** `ground-50` … `ground-900` (RGB-triplet vars, supports `/<alpha>`, e.g.
  `bg-ground-50`, `text-ground-900`, `border-ground-200`, `bg-ground-100/50`). Inverts in dark.
  Drop-in replacement for the old forked inverted `slate` ramp (same values).
- **Surfaces:** `bg-surface` (card), `bg-surface-muted` / `bg-canvas` (page).
- **Text:** `text-ink` (primary), `text-ink-muted` / `text-muted` (secondary).
- **Borders:** `border-line`.
- **Charts / data-viz:** `chart-primary|secondary|tertiary|1..8`, `chart-success|warning|danger`,
  `chart-grid|axis|line|tooltip|tooltip-fg|crit|high|thresh|band|band-strong|band-neutral|nodata`
  (e.g. `bg-chart-primary`, `text-chart-success`, `fill-chart-2`, `stroke-chart-axis`). Same
  values as the existing `viz-*` aliases; both flip in dark mode. For data-DRIVEN SVG fills, read
  `var(--viz-*)` directly in `style={{}}`.

## Exports
- `@niyi/ui` — `Button, Card, Input, Badge, StatCard, PageHeader, LoadingSpinner, EmptyState,
  Modal, Pagination, SegmentedControl, PageErrorState, PageEmptyState, ThemeProvider, useTheme,
  THEME_STORAGE_KEY, ThemeToggle, ThemeScript, themeScriptSource, cn`.
- `@niyi/ui/tailwind-preset` — design tokens (colors incl. `ground`/`surface`/`ink`/`chart`,
  fonts, shadows, radius, spacing).
- `@niyi/ui/styles.css` — base + component `@layer` CSS (`.btn`, `.card`, `.input`, `.badge`,
  typography, focus ring, reduced-motion handling).

## Develop
```bash
npm install
npm run build   # tsc → dist/ + restores 'use client' directives; commit dist
```
Changing a token/component = one PR here + a SHA bump in each app.

## Releases

Every release is an annotated tag `vX.Y.Z` on `main`; `package.json` `version` and the tag
always match. Cut one with:

```bash
scripts/release.sh minor        # or patch / major / an explicit X.Y.Z
```

The script refuses to run on a dirty tree, off `main`, out of sync with origin, or when
`dist/` is older than `src/` (build in Docker via `npm run verify-dist` and commit dist
first). Consumers pin git SHAs/tags — roll them forward with
`~/scripts/host-infra/bump-libs.sh`.
