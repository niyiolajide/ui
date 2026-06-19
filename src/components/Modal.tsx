'use client'

import { useEffect, useRef, useCallback, useId } from 'react'
import Button from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  confirmLabel?: string
  confirmVariant?: 'primary' | 'danger'
  onConfirm?: () => void
  loading?: boolean
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  confirmLabel,
  confirmVariant = 'primary',
  onConfirm,
  loading = false,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Focus trap and Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && !loading) {
      onClose()
      return
    }

    if (e.key === 'Tab' && dialogRef.current) {
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
  }, [onClose, loading])

  // Keydown listener (focus trap + Escape). Re-binds when handleKeyDown changes.
  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, handleKeyDown])

  // Auto-focus the first focusable element — ONCE, when the modal opens.
  // Deps are intentionally just [open]: the previous version also depended on
  // handleKeyDown, so any consumer re-render that changed handleKeyDown's identity
  // (e.g. an unstable onClose/loading) re-ran this effect and yanked the cursor
  // back to the first input on every keystroke. The contains() guard is belt-and-
  // suspenders: even if this ever re-runs, it must never steal focus from a control
  // the user is already editing inside the dialog.
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => {
      const dialog = dialogRef.current
      if (!dialog || dialog.contains(document.activeElement)) return
      const focusable = dialog.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      )
      focusable?.focus()
    }, 50)
    return () => clearTimeout(timer)
  }, [open])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6"
      >
        <h3 id={titleId} className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">{title}</h3>
        <div className="text-neutral-600 dark:text-neutral-400 mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          {confirmLabel && onConfirm && (
            <Button variant={confirmVariant} onClick={onConfirm} loading={loading}>
              {confirmLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
