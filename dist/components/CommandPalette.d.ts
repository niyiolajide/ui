import { type PaletteControllerOptions } from './CommandPalette.hooks';
/**
 * ⌘K command palette (design-system generalization of FinPulse's, per UX review R4).
 * Searches the app-provided `commands` (resolved nav + quick actions — the server
 * layout resolves them from the control bus; this client component can't) plus a
 * cross-app jump index derived from the registry `apps` (readApps() output): every
 * other app and its web-surface nav become "AppName · Screen" entries that navigate
 * with a full page load. Fuzzy subsequence match, full keyboard nav (⌘K/↑/↓/Enter/Esc).
 * Render into the AppShell topbar `actions` slot.
 */
export declare function CommandPalette(props: PaletteControllerOptions & {
    placeholder?: string;
}): import("react").JSX.Element;
