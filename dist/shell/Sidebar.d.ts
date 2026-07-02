export interface NavItem {
    href: string;
    label: string;
    icon?: string;
    /** Optional count/status pill at the row's right edge (e.g. unread notifications). */
    badge?: string | number;
}
export interface NavGroup {
    label?: string;
    items: NavItem[];
    /** Labeled groups only: the label becomes a toggle that collapses the group. */
    collapsible?: boolean;
    /** Start collapsed. Ignored while the group contains the active route. */
    defaultCollapsed?: boolean;
}
/** Shared left nav. Active state from the current pathname. */
export default function Sidebar({ groups, hrefDecorator, }: {
    groups: NavGroup[];
    /**
     * Rewrite each item's href just before render (append query params, etc.).
     * Active-state matching uses the path only, so query/hash decoration never
     * breaks highlighting.
     */
    hrefDecorator?: (href: string) => string;
}): import("react").JSX.Element;
