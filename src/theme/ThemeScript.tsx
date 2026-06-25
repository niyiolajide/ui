// Pre-hydration FOUC-prevention script. Runs BEFORE React/paint to set the `.dark`
// class on <html> from the stored theme (or `matchMedia` when unset/`system`), so the
// page never flashes the wrong theme. Shares the SAME localStorage key the
// ThemeProvider uses (`theme`), so toggling persists across reloads.
//
// Consumers render this inside <head> of their root layout, instead of copy-pasting
// the inline script:
//
//   import { ThemeScript } from '@niyi/ui'
//   ...
//   <head>
//     <ThemeScript />
//   </head>
//
// The storage key is the SAME value the ThemeProvider reads/writes (re-exported below),
// so the pre-paint script and the runtime provider can never drift apart.
import React from 'react'
import { STORAGE_KEY } from './ThemeProvider'

/** localStorage key the ThemeProvider reads/writes. Re-export of ThemeProvider's STORAGE_KEY. */
export const THEME_STORAGE_KEY = STORAGE_KEY

/**
 * Returns the raw JS (no <script> wrapper) that resolves + applies the theme class on
 * <html> before paint. Use this if you need to embed the logic yourself; most consumers
 * should render <ThemeScript /> instead.
 */
export function themeScriptSource(storageKey: string = THEME_STORAGE_KEY): string {
  return `(function(){try{var t=localStorage.getItem('${storageKey}');var r=t;if(!t||t==='system'){r=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.add(r)}catch(e){}})();`
}

export interface ThemeScriptProps {
  /** Override the localStorage key. Defaults to the ThemeProvider key (`theme`). */
  storageKey?: string
  /** Optional nonce for strict CSP (passed through to the inline <script>). */
  nonce?: string
}

/**
 * Inline <script> that prevents the dark-mode FOUC. Render once inside <head> of the
 * root layout, above the app. It only ADDS the resolved class (light|dark) pre-hydration;
 * the ThemeProvider takes over reconciliation after mount.
 */
export default function ThemeScript({ storageKey = THEME_STORAGE_KEY, nonce }: ThemeScriptProps = {}) {
  return (
    <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScriptSource(storageKey) }} />
  )
}
