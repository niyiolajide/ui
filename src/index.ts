// @niyi/ui — shared design-system primitives. Import the Tailwind preset separately
// (`@niyi/ui/tailwind-preset`) and the base CSS (`@niyi/ui/styles.css`).
export { cn } from './cn'

export { default as Button } from './components/Button'
export { default as Card } from './components/Card'
export { default as Input } from './components/Input'
export { default as Badge } from './components/Badge'
export { default as StatCard } from './components/StatCard'
export { default as PageHeader } from './components/PageHeader'
export { default as LoadingSpinner } from './components/LoadingSpinner'
export { default as EmptyState } from './components/EmptyState'
export { default as Modal } from './components/Modal'
export { Pagination } from './components/Pagination'
export { SegmentedControl } from './components/SegmentedControl'
export { PageErrorState, PageEmptyState } from './components/PageState'

export { ThemeProvider, useTheme } from './theme/ThemeProvider'
export { default as ThemeToggle } from './theme/ThemeToggle'
