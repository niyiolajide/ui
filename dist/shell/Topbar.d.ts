import { type AppInfo } from './AppSwitcher';
import { type ShellUser } from './UserMenu';
/** Shared top bar: brand + app switcher + theme toggle + account menu. */
export default function Topbar({ appName, apps, currentKey, user, isAdmin, hubUrl, left, themeToggle, }: {
    appName: string;
    apps: AppInfo[];
    currentKey?: string;
    user?: ShellUser;
    isAdmin?: boolean;
    hubUrl?: string;
    left?: React.ReactNode;
    /** Show the light/dark toggle. Set false for apps that don't yet support dark mode. */
    themeToggle?: boolean;
}): import("react").JSX.Element;
