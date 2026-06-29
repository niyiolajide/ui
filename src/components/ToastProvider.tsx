'use client'

// SH-2 — a self-contained, dependency-free toast system for the whole family.
// (Supersedes the prior no-op placeholder: rather than have every app wire its own
// toast lib, the design system owns the success/error/info moment so it's consistent
// and zero-boilerplate — wrap the app once in <ToastProvider>, then `useToast()`.)
//
// Visual language: surface card + left accent (teal for success, red for error,
// neutral for info), shadow-elevated, slide-up entrance. Token colors only.

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '../cn'

type ToastType = 'success' | 'error' | 'info'

interface ToastAction {
  label: string
  onClick: () => void
}

interface ToastOptions {
  /** ms before auto-dismiss; pass 0 to keep until dismissed. Default 4000. */
  duration?: number
  /** Optional inline action, e.g. an Undo or "View →". */
  action?: ToastAction
}

interface ToastItem extends Required<Pick<ToastOptions, 'duration'>> {
  id: number
  type: ToastType
  message: string
  action?: ToastAction
}

interface ToastApi {
  toast: (message: string, opts?: ToastOptions & { type?: ToastType }) => void
  success: (message: string, opts?: ToastOptions) => void
  error: (message: string, opts?: ToastOptions) => void
  info: (message: string, opts?: ToastOptions) => void
  dismiss: (id: number) => void
}

const ToastContext = createContext<ToastApi | null>(null)

let _seq = 0

function appendToast(
  setToasts: Dispatch<SetStateAction<ToastItem[]>>,
  type: ToastType,
  message: string,
  opts?: ToastOptions,
): void {
  const id = ++_seq
  setToasts((list) => [
    ...list,
    { id, type, message, action: opts?.action, duration: opts?.duration ?? 4000 },
  ])
}

function withoutToast(list: ToastItem[], id: number): ToastItem[] {
  return list.filter((t) => t.id !== id)
}

function makeDismiss(setToasts: Dispatch<SetStateAction<ToastItem[]>>) {
  return (id: number) => {
    setToasts((list) => withoutToast(list, id))
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useMemo(() => makeDismiss(setToasts), [])

  const push = useCallback((type: ToastType, message: string, opts?: ToastOptions) => {
    appendToast(setToasts, type, message, opts)
  }, [])

  const api = useMemo<ToastApi>(() => {
    return {
      toast: (message, opts) => { push(opts?.type ?? 'info', message, opts); },
      success: (message, opts) => { push('success', message, opts); },
      error: (message, opts) => { push('error', message, opts); },
      info: (message, opts) => { push('info', message, opts); },
      dismiss,
    }
  }, [dismiss, push])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <ToastRow key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const TONE: Record<ToastType, { accent: string; icon: typeof Info; iconColor: string }> = {
  success: { accent: 'border-l-primary-500', icon: CheckCircle2, iconColor: 'text-primary-600 dark:text-primary-400' },
  error: { accent: 'border-l-error-500', icon: AlertTriangle, iconColor: 'text-error-600 dark:text-error-400' },
  info: { accent: 'border-l-neutral-400', icon: Info, iconColor: 'text-neutral-500 dark:text-neutral-400' },
}

function ToastRow({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: number) => void }) {
  useEffect(() => {
    if (toast.duration <= 0) {return}
    const timer = setTimeout(() => { onDismiss(toast.id); }, toast.duration)
    return () => { clearTimeout(timer); }
  }, [toast.id, toast.duration, onDismiss])

  const { accent, icon: Icon, iconColor } = TONE[toast.type]

  return (
    <div
      role="status"
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
      className={cn(
        'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-l-4 border-neutral-200 bg-surface p-4 shadow-elevated animate-fadeUp dark:border-neutral-700',
        accent,
      )}
    >
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', iconColor)} strokeWidth={2} />
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm text-neutral-900 dark:text-neutral-50">{toast.message}</p>
        {toast.action && (
          <button
            type="button"
            onClick={() => {
              toast.action?.onClick()
              onDismiss(toast.id)
            }}
            className="mt-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => { onDismiss(toast.id); }}
        aria-label="Dismiss"
        className="shrink-0 rounded p-0.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext)
  if (!ctx) {throw new Error('useToast must be used within <ToastProvider>')}
  return ctx
}
