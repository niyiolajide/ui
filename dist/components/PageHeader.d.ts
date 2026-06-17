interface BreadcrumbItem {
    label: string;
    href?: string;
}
interface PageHeaderProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    actions?: React.ReactNode;
}
export default function PageHeader({ title, subtitle, breadcrumbs, actions }: PageHeaderProps): import("react").JSX.Element;
export {};
