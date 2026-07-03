export default function ReportButton({ appName, pageTitle, endpoint, }: {
    appName: string;
    /** Optional human page title included with the report. Defaults to the document title at submit time. */
    pageTitle?: string;
    /** Same-origin route the report is POSTed to. Every app exposes `/api/report-issue`. */
    endpoint?: string;
}): import("react").JSX.Element;
