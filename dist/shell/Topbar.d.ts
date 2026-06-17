import { type AppInfo } from './AppSwitcher';
import { type ShellUser } from './UserMenu';
/** Shared top bar: brand + app switcher + theme toggle + account menu. */
export default function Topbar({ appName, apps, currentKey, user, isAdmin, hubUrl, left, }: {
    appName: string;
    apps: AppInfo[];
    currentKey?: string;
    user?: ShellUser;
    isAdmin?: boolean;
    hubUrl?: string;
    left?: React.ReactNode;
}): import("react").JSX.Element;
