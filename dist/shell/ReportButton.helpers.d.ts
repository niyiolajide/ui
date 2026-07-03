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
export declare function attachScreenshot({ setBusy, setScreenshot, setStatus }: {
    setBusy: (value: boolean) => void;
    setScreenshot: (value: string | null) => void;
    setStatus: (value: string) => void;
}): Promise<void>;
export declare function submitReport({ description, endpoint, pageContext, screenshot, setBusy, setDescription, setScreenshot, setStatus, type }: {
    description: string;
    endpoint: string;
    pageContext: PageContext;
    screenshot: string | null;
    setBusy: (value: boolean) => void;
    setDescription: (value: string) => void;
    setScreenshot: (value: string | null) => void;
    setStatus: (value: string) => void;
    type: ReportType;
}): Promise<void>;
