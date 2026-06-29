'use client';
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackUsage = trackUsage;
exports.default = UsageTracker;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const FLUSH_INTERVAL_MS = 10000;
// ── browser-safe ULID (Crockford base32: 48-bit time + 80-bit randomness) ─────
const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
function ulid() {
    let t = Date.now();
    let time = '';
    for (let i = 9; i >= 0; i--) {
        time = CROCKFORD[t % 32] + time;
        t = Math.floor(t / 32);
    }
    const rnd = new Uint8Array(16);
    globalThis.crypto.getRandomValues(rnd);
    let rand = '';
    for (let i = 0; i < 16; i++) {
        rand += CROCKFORD[rnd[i] % 32];
    }
    return time + rand;
}
const ID_SEG = /^(\d+|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;
function screenKeyFor(pathname, navSorted) {
    const path = pathname.replace(/\/+$/, '') || '/';
    for (const item of navSorted) {
        if (path === item.href || path.startsWith(item.href + '/')) {
            return item.key;
        }
    }
    const redacted = path
        .split('/')
        .filter(Boolean)
        .map((seg) => (ID_SEG.test(seg) ? ':id' : seg))
        .join('/');
    return redacted || 'root';
}
/**
 * Absolute same-origin ingest URL. We resolve against window.location.origin so the
 * URL does NOT begin with "/api" — otherwise @niyi/ui's BasePathFetch fetch-patch
 * would rewrite a relative "/api/usage" to "/<basePath>/api/usage" and miss the
 * root-mounted ControlPlane ingest. (sendBeacon isn't patched, but the fetch
 * fallback would be; an absolute URL is correct for both.)
 */
function ingestUrl(ingestPath) {
    try {
        return new URL(ingestPath, window.location.origin).toString();
    }
    catch {
        return ingestPath;
    }
}
// ── module-level batch queue (shared by the component + trackUsage) ───────────
let queue = [];
let lastScreen = null;
let lastEnteredAt = 0;
let conf = { app: '', surface: 'web', url: '/api/usage', enabled: true };
function flush() {
    if (!conf.enabled || queue.length === 0 || typeof navigator === 'undefined') {
        return;
    }
    const batch = queue;
    queue = [];
    const body = JSON.stringify({ events: batch });
    try {
        const sent = navigator.sendBeacon(conf.url, new Blob([body], { type: 'application/json' }));
        if (sent) {
            return;
        }
        void fetch(conf.url, {
            method: 'POST',
            body,
            headers: { 'content-type': 'application/json' },
            keepalive: true,
            credentials: 'same-origin',
        }).catch(() => { });
    }
    catch {
        /* never break navigation */
    }
}
/** Record an in-screen action for the current screen. Safe to call from any client code. */
function trackUsage(action, meta) {
    if (!conf.enabled || !lastScreen) {
        return;
    }
    queue.push({
        id: ulid(),
        ts: new Date().toISOString(),
        app: conf.app,
        surface: conf.surface,
        screenKey: lastScreen,
        type: 'action',
        action,
        ...(meta ? { meta } : {}),
    });
}
function UsageTracker({ app, nav, surface = 'web', ingestPath = '/api/usage', enabled = true, }) {
    const pathname = (0, navigation_1.usePathname)();
    // Keep module config in sync (trackUsage + flush read it).
    (0, react_1.useEffect)(() => {
        conf = { app, surface, url: ingestUrl(ingestPath), enabled };
    }, [app, surface, ingestPath, enabled]);
    (0, react_1.useEffect)(() => {
        if (!enabled || !pathname) {
            return;
        }
        const navSorted = [...(nav ?? [])].sort((a, b) => b.href.length - a.href.length);
        const screenKey = screenKeyFor(pathname, navSorted);
        if (lastScreen === screenKey) {
            return;
        } // skip query-param-only changes
        const now = Date.now();
        const event = {
            id: ulid(),
            ts: new Date().toISOString(),
            app,
            surface,
            screenKey,
            type: 'view',
        };
        if (lastScreen) {
            event.fromScreenKey = lastScreen;
            event.durationMs = Math.max(0, now - lastEnteredAt);
        }
        queue.push(event);
        lastScreen = screenKey;
        lastEnteredAt = now;
        flush();
    }, [pathname, enabled, nav, app, surface]);
    (0, react_1.useEffect)(() => {
        if (!enabled) {
            return;
        }
        const iv = setInterval(flush, FLUSH_INTERVAL_MS);
        const onHide = () => { flush(); };
        document.addEventListener('visibilitychange', onHide);
        window.addEventListener('pagehide', onHide);
        return () => {
            clearInterval(iv);
            document.removeEventListener('visibilitychange', onHide);
            window.removeEventListener('pagehide', onHide);
            flush();
        };
    }, [enabled]);
    return null;
}
