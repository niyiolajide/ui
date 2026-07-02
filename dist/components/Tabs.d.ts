import type { ReactNode } from 'react';
export interface TabItem<T extends string = string> {
    key: T;
    label: string;
    /** Renders the tab as a Next <Link>; active state then comes from the route. */
    href?: string;
    /** Route tabs match by prefix by default; set for index routes like "/" that must match exactly. */
    exact?: boolean;
    icon?: ReactNode;
    /** Count badge — rendered only when > 0. */
    badge?: number;
    badgeVariant?: 'success' | 'warning' | 'error' | 'neutral' | 'info';
}
interface TabsProps<T extends string> {
    items: TabItem<T>[];
    /** Controlled active key for state-driven tabs (href items derive it from the route instead). */
    value?: T;
    onChange?: (key: T) => void;
    ariaLabel?: string;
    size?: 'sm' | 'md';
    className?: string;
}
/**
 * Underline tab strip — the design-system home for both flavors of tab bar:
 * route-aware page tabs (items with `href`, active from the pathname, rendered
 * as Next <Link>s so basePath is auto-prepended) and controlled state tabs
 * (`value`/`onChange`). Count badges per tab render only when > 0.
 */
export declare function Tabs<T extends string>({ items, value, onChange, ariaLabel, size, className, }: TabsProps<T>): import("react").JSX.Element;
export {};
