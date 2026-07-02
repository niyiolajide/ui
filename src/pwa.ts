import type { Metadata, Viewport } from 'next'

/** Pulse brand teal — PWA theme/background color. */
export const PULSE_THEME_COLOR = '#0F766E'

export interface PwaOptions {
  /** Title under the home-screen icon when launched standalone. Default 'Pulse'. */
  title?: string
  /** iOS status-bar style in standalone. Default 'default'. */
  statusBarStyle?: 'default' | 'black' | 'black-translucent'
  /**
   * The app's Next `basePath` (e.g. '/lifepulse'). Next does NOT prefix
   * metadata icon URLs with basePath, so without this the icon links point at
   * the origin root — the hub's copies on the shared origin, 404s on direct
   * port access. Pass it so each app serves its own `public/` icons.
   */
  basePath?: string
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
export function pwaMetadata({ title = 'Pulse', statusBarStyle = 'default', basePath = '' }: PwaOptions = {}): Metadata {
  const prefix = basePath === '/' ? '' : basePath
  return {
    applicationName: title,
    appleWebApp: { capable: true, title, statusBarStyle },
    icons: {
      icon: [
        { url: `${prefix}/icon-192.png`, sizes: '192x192', type: 'image/png' },
        { url: `${prefix}/icon-512.png`, sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: `${prefix}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
    },
  }
}

/** Shared PWA viewport (theme-color). Spread into a segment's `export const viewport`. */
export function pwaViewport(themeColor: string = PULSE_THEME_COLOR): Viewport {
  return { themeColor }
}
