import { type NavGroup } from './Sidebar';
import { type BreadcrumbItem } from './Breadcrumbs';
import type { AppInfo } from './AppSwitcher';
import type { ShellUser } from './UserMenu';
/** The shared application shell: consistent topbar (brand + app switcher + theme
 *  toggle + account menu) and optional left nav, across every app. */
export default function AppShell({ appName, apps, currentKey, user, isAdmin, hubUrl, nav, topbarLeft, breadcrumbs, actions, themeToggle, children, }: {
    appName: string;
    apps: AppInfo[];
    currentKey?: string;
    user?: ShellUser;
    isAdmin?: boolean;
    hubUrl?: string;
    nav?: NavGroup[];
    /** Forwarded to Topbar's left slot (e.g. a mobile nav trigger), before the brand. */
    topbarLeft?: React.ReactNode;
    /** Optional breadcrumb trail rendered above the page content. */
    breadcrumbs?: BreadcrumbItem[];
    actions?: React.ReactNode;
    themeToggle?: boolean;
    children: React.ReactNode;
}): import("react").JSX.Element;
