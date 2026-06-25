import React from 'react';
/** localStorage key the ThemeProvider reads/writes. Re-export of ThemeProvider's STORAGE_KEY. */
export declare const THEME_STORAGE_KEY = "theme";
/**
 * Returns the raw JS (no <script> wrapper) that resolves + applies the theme class on
 * <html> before paint. Use this if you need to embed the logic yourself; most consumers
 * should render <ThemeScript /> instead.
 */
export declare function themeScriptSource(storageKey?: string): string;
export interface ThemeScriptProps {
    /** Override the localStorage key. Defaults to the ThemeProvider key (`theme`). */
    storageKey?: string;
    /** Optional nonce for strict CSP (passed through to the inline <script>). */
    nonce?: string;
}
/**
 * Inline <script> that prevents the dark-mode FOUC. Render once inside <head> of the
 * root layout, above the app. It only ADDS the resolved class (light|dark) pre-hydration;
 * the ThemeProvider takes over reconciliation after mount.
 */
export default function ThemeScript({ storageKey, nonce }?: ThemeScriptProps): React.JSX.Element;
