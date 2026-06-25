export interface UsageNavItem {
    /** Route path WITHOUT basePath, e.g. "/networth/analysis". */
    href: string;
    /** Stable canonical screen key, e.g. "networth-analysis". */
    key: string;
}
export interface UsageTrackerProps {
    /** App key, e.g. "finpulse". */
    app: string;
    /** Nav registry for route→screenKey resolution. Falls back to a redacted path. */
    nav?: UsageNavItem[];
    /** Surface; WebView modules report as 'web'. Default 'web'. */
    surface?: 'web' | 'phone' | 'ipad';
    /** Ingest path on the shared origin. Default '/api/usage'. */
    ingestPath?: string;
    /** Master switch (e.g. from control/analytics.json). Default true. */
    enabled?: boolean;
}
/** Record an in-screen action for the current screen. Safe to call from any client code. */
export declare function trackUsage(action: string, meta?: Record<string, unknown>): void;
export default function UsageTracker({ app, nav, surface, ingestPath, enabled, }: UsageTrackerProps): null;
