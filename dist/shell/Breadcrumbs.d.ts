export interface BreadcrumbItem {
    label: string;
    /** Omit on the current (last) crumb. */
    href?: string;
}
/** Breadcrumb trail rendered by AppShell above the page content. Crumbs with an
 *  href are Next <Link>s (basePath auto-prepended); the last crumb is the current
 *  page (aria-current). */
export default function Breadcrumbs({ items, className }: {
    items: BreadcrumbItem[];
    className?: string;
}): import("react").JSX.Element | null;
