export interface NavItem {
    href: string;
    label: string;
    icon?: string;
}
export interface NavGroup {
    label?: string;
    items: NavItem[];
}
/** Shared left nav. Active state from the current pathname. */
export default function Sidebar({ groups }: {
    groups: NavGroup[];
}): import("react").JSX.Element;
