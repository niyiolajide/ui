import AppSwitcher, { type AppInfo } from './AppSwitcher'
import UserMenu, { type ShellUser } from './UserMenu'
import ThemeToggle from '../theme/ThemeToggle'

/** Shared top bar: brand + app switcher + theme toggle + account menu. */
export default function Topbar({
  appName,
  apps,
  currentKey,
  user,
  isAdmin,
  hubUrl,
  left,
  actions,
  themeToggle = true,
}: {
  appName: string
  apps: AppInfo[]
  currentKey?: string
  user?: ShellUser
  isAdmin?: boolean
  hubUrl?: string
  left?: React.ReactNode
  /** App-specific topbar items (e.g. a notifications bell), shown before the switcher. */
  actions?: React.ReactNode
  /** Show the light/dark toggle. Set false for apps that don't yet support dark mode. */
  themeToggle?: boolean
}) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 bg-surface px-4 backdrop-blur">
      {left}
      <span className="font-display text-lg leading-none text-neutral-900 dark:text-neutral-50">{appName}</span>
      <div className="ml-auto flex items-center gap-1">
        {actions}
        <AppSwitcher apps={apps} currentKey={currentKey} />
        {themeToggle && <ThemeToggle />}
        <UserMenu user={user} isAdmin={isAdmin} hubUrl={hubUrl} />
      </div>
    </header>
  )
}
