export default function ReportButton({ appName, pageTitle, endpoint, }: {
    appName: string;
    /** Optional human page title included with the report. Defaults to the document title at submit time. */
    pageTitle?: string;
    /** Override the report endpoint. Defaults to a basePath-aware same-origin
     *  `/api/report-issue` resolved at submit time (see reportEndpoint). */
    endpoint?: string;
}): import("react").JSX.Element;
