'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const themeConfig = {
  light: { icon: Sun, label: 'Light mode', next: 'dark' as const },
  dark: { icon: Moon, label: 'Dark mode', next: 'system' as const },
  system: { icon: Monitor, label: 'System mode', next: 'light' as const },
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const config = themeConfig[theme]
  const Icon = config.icon
  const tooltipId = 'theme-toggle-tooltip'

  return (
    <div className="relative group">
      <button
        onClick={() => { setTheme(config.next); }}
        className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        aria-label={`Current: ${config.label}. Click to switch.`}
        aria-describedby={tooltipId}
      >
        <Icon className="w-5 h-5" />
      </button>
      <span id={tooltipId} role="tooltip" className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-xs font-medium text-white bg-neutral-800 dark:bg-neutral-700 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none transition-opacity z-50">
        {config.label}
      </span>
    </div>
  )
}
