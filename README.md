# @niyi/ui

Shared design system for the sibling apps (HealthPulse, Vantage, PropertyPulse, LifeOS, auth-hub).
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
   `--font-display` (DM Serif Display); wrap in `ThemeProvider`; add the no-FOUC theme script.
5. Use the primitives + semantic tokens; never raw `slate-*`/hex/inline styles.

## Exports
- `@niyi/ui` — `Button, Card, Input, Badge, StatCard, PageHeader, LoadingSpinner, EmptyState,
  Modal, Pagination, SegmentedControl, PageErrorState, PageEmptyState, ThemeProvider, useTheme,
  ThemeToggle, cn`.
- `@niyi/ui/tailwind-preset` — design tokens (colors, fonts, shadows, radius, spacing).
- `@niyi/ui/styles.css` — base + component `@layer` CSS (`.btn`, `.card`, `.input`, `.badge`,
  typography, focus ring, reduced-motion handling).

## Develop
```bash
npm install
npm run build   # tsc → dist/ + restores 'use client' directives; commit dist
```
Changing a token/component = one PR here + a SHA bump in each app.
