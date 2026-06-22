import type { Metadata, Viewport } from 'next';
/** Pulse brand teal — PWA theme/background color. */
export declare const PULSE_THEME_COLOR = "#0F766E";
export interface PwaOptions {
    /** Title under the home-screen icon when launched standalone. Default 'Pulse'. */
    title?: string;
    /** iOS status-bar style in standalone. Default 'default'. */
    statusBarStyle?: 'default' | 'black' | 'black-translucent';
}
/**
 * Shared PWA `<head>` metadata for every Pulse app — single source of truth.
 * Spread into a route segment's `export const metadata`. Emits the iOS
 * `apple-mobile-web-app-capable` + title/status-bar meta (so navigating across
 * apps stays full-screen standalone) and the icon set. Each app serves its own
 * copy of /icon-192.png, /icon-512.png, /apple-touch-icon.png under its basePath.
 *
 * The installable manifest (scope "/") is declared once by the hub at the origin
 * root (app/manifest.ts), so it is intentionally NOT set here — that keeps the
 * whole single origin one installed "Pulse" app and avoids per-app manifests
 * getting basePath-prefixed.
 *
 * Pair with `pwaViewport()` in the segment's `export const viewport`.
 */
export declare function pwaMetadata({ title, statusBarStyle }?: PwaOptions): Metadata;
/** Shared PWA viewport (theme-color). Spread into a segment's `export const viewport`. */
export declare function pwaViewport(themeColor?: string): Viewport;
