import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../cn'
import type { LucideIcon } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'neutral'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  loading?: boolean
  /** Replaces the label while `loading` — give it context ("Saving…", "Pulling transactions…"). */
  loadingLabel?: string
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
}

const BUTTON_VARIANTS = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  danger: 'btn btn-danger',
  ghost: 'btn text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-primary-500',
  outline: 'btn bg-surface text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-surface-muted',
  neutral: 'btn bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200',
}

const BUTTON_SIZES = {
  xs: 'px-2.5 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-2.5',
  lg: 'px-8 py-3 text-lg',
}

const ICON_SIZES = {
  xs: 'w-3 h-3',
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingLabel,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled === true || loading

  return (
    <button
      className={cn(
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        loading && 'opacity-70 cursor-not-allowed',
        className
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-current" role="status" aria-label="Loading" />
          {loadingLabel ?? children}
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          {LeftIcon && <LeftIcon className={ICON_SIZES[size]} />}
          {children}
          {RightIcon && <RightIcon className={ICON_SIZES[size]} />}
        </span>
      )}
    </button>
  )
}
