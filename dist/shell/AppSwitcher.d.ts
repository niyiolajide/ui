export interface AppInfo {
    key: string;
    name: string;
    url: string;
    icon?: string;
}
/** Cross-app launcher — lists every sibling app from the registry. Present in every shell. */
export default function AppSwitcher({ apps, currentKey }: {
    apps: AppInfo[];
    currentKey?: string;
}): import("react").JSX.Element | null;
