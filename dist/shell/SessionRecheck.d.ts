/**
 * Re-verify the session on history traversal only. Back/Forward restores pages
 * from the client router cache, and the browser restores whole pages from the
 * bfcache, without running the server page guard — so a session revoked or
 * expired while the app is open must be caught here. Forward navigations render
 * on the server and are guarded there.
 *
 * Listens to `popstate` and persisted `pageshow` only: never on mount,
 * pathname changes, ordinary push navigation, or non-persisted pageshow.
 * Fetches the explicit same-origin `sessionCheckUrl` (the app supplies its own
 * base path, e.g. `/lifepulse/api/auth/session`; this hook never derives it
 * from the pathname) with `cache: 'no-store'`. Only an exact 401 counts as
 * expired: 204, 500, and network errors keep the page, and every further
 * server request stays gated anyway.
 */
export declare function useHistorySessionRecheck(sessionCheckUrl: string, onExpired: () => void): void;
/**
 * Opt-in client null-render: rechecks the session on Back/Forward and reloads
 * the page on a definite 401, letting each app's server guard redirect
 * correctly. Render from AppShell via `sessionCheckUrl`, or directly for apps
 * that do not use AppShell (such as RetirementPulse).
 */
export default function SessionRecheck({ sessionCheckUrl }: {
    sessionCheckUrl: string;
}): null;
