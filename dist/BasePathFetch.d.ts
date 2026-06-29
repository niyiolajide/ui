interface BasePathFetchProps {
    /** The app's Next.js basePath, e.g. "/finpulse". No-op when empty. */
    basePath: string;
}
/**
 * Renders a synchronous inline script that patches `window.fetch` so client-side
 * calls to root-absolute `/api/...` paths get the app's `basePath` prefix.
 *
 * Next.js prepends `basePath` to <Link>/router/redirect/next-image but NOT to
 * `fetch()` — so under a basePath (single-origin PWA routing) every client
 * `fetch('/api/...')` would otherwise hit the wrong origin path (the root, i.e.
 * the hub). This adapter fixes all call sites at once. Place it in the root
 * layout <head> BEFORE app code so even early fetches are covered.
 *
 * Only same-origin string requests beginning with `/api` are rewritten; external
 * URLs, `/_next` (Next handles those), and already-prefixed paths are untouched.
 */
export default function BasePathFetch({ basePath }: BasePathFetchProps): import("react").JSX.Element | null;
export {};
