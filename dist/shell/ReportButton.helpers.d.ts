export type ReportType = 'bug' | 'enhancement';
export type PageContext = {
    appName: string;
    codePath: string;
    pathname: string;
    title: string;
    url: string;
};
export declare function currentPageContext(appName: string, pageTitle: string): PageContext;
export declare function serverPageContext(appName: string, pageTitle: string): PageContext;
/**
 * Resolve the same-origin report endpoint as an ABSOLUTE URL that already
 * includes the app's Next.js basePath. Every app namespaces its routes under a
 * basePath (e.g. `/finpulse`), so `/api/report-issue` alone 404s. Next only
 * *sometimes* auto-prefixes basePath onto a client `fetch('/…')`, so we cannot
 * rely on it — instead we read the basePath off a `/_next/` asset URL (always
 * served under basePath) and build the full URL ourselves. An absolute URL is
 * returned so Next's fetch patch cannot double-prefix it.
 */
export declare function reportEndpoint(explicit?: string): string;
export declare function attachScreenshot({ setBusy, setScreenshot, setStatus }: {
    setBusy: (value: boolean) => void;
    setScreenshot: (value: string | null) => void;
    setStatus: (value: string) => void;
}): Promise<void>;
export declare function submitReport({ description, endpoint, pageContext, screenshot, setBusy, setDescription, setScreenshot, setStatus, type }: {
    description: string;
    endpoint?: string;
    pageContext: PageContext;
    screenshot: string | null;
    setBusy: (value: boolean) => void;
    setDescription: (value: string) => void;
    setScreenshot: (value: string | null) => void;
    setStatus: (value: string) => void;
    type: ReportType;
}): Promise<void>;
