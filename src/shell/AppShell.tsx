import Topbar from './Topbar'
import Sidebar, { type NavGroup } from './Sidebar'
import type { AppInfo } from './AppSwitcher'
import type { ShellUser } from './UserMenu'

/** The shared application shell: consistent topbar (brand + app switcher + theme
 *  toggle + account menu) and optional left nav, across every app. */
export default function AppShell({
  appName,
  apps,
  currentKey,
  user,
  isAdmin,
  hubUrl,
  nav,
  actions,
  themeToggle = true,
  children,
}: {
  appName: string
  apps: AppInfo[]
  currentKey?: string
  user?: ShellUser
  isAdmin?: boolean
  hubUrl?: string
  nav?: NavGroup[]
  actions?: React.ReactNode
  themeToggle?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Topbar appName={appName} apps={apps} currentKey={currentKey} user={user} isAdmin={isAdmin} hubUrl={hubUrl} actions={actions} themeToggle={themeToggle} />
      <div className="mx-auto flex w-full max-w-[1400px]">
        {nav && nav.length > 0 && (
          <aside className="hidden w-60 shrink-0 border-r border-neutral-200 dark:border-neutral-700 md:block">
            <div className="sticky top-14">
              <Sidebar groups={nav} />
            </div>
          </aside>
        )}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  )
}
