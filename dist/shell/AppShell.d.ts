import { type NavGroup } from './Sidebar';
import { type AppInfo } from './AppSwitcher';
import { type ShellUser } from './UserMenu';
/** The shared application shell: consistent topbar (brand + app switcher + theme
 *  toggle + account menu) and optional left nav, across every app. */
export default function AppShell({ appName, apps, currentKey, user, isAdmin, hubUrl, nav, children, }: {
    appName: string;
    apps: AppInfo[];
    currentKey?: string;
    user?: ShellUser;
    isAdmin?: boolean;
    hubUrl?: string;
    nav?: NavGroup[];
    children: React.ReactNode;
}): import("react").JSX.Element;
