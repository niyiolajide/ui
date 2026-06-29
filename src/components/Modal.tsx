'use client'

import { useEffect, useRef, useCallback, useId, type RefObject, type ReactNode } from 'react'
import Button from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  confirmLabel?: string
  confirmVariant?: 'primary' | 'danger'
  onConfirm?: () => void
  loading?: boolean
}

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function useBodyScrollLock(open: boolean): void {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])
}

function trapTab(e: KeyboardEvent, dialog: HTMLDivElement): void {
  const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  if (focusable.length === 0) {
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

function useModalKeyboard({
  open,
  loading,
  onClose,
  dialogRef,
}: {
  open: boolean
  loading: boolean
  onClose: () => void
  dialogRef: RefObject<HTMLDivElement>
}): void {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && !loading) {
      onClose()
      return
    }

    const dialog = dialogRef.current
    if (e.key === 'Tab' && dialog) {
      trapTab(e, dialog)
    }
  }, [onClose, loading, dialogRef])

  useEffect(() => {
    if (!open) {
      return
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, handleKeyDown])
}

function useInitialModalFocus(open: boolean, dialogRef: RefObject<HTMLDivElement>): void {
  useEffect(() => {
    if (!open) {
      return
    }
    const timer = setTimeout(() => {
      const dialog = dialogRef.current
      if (!dialog || dialog.contains(document.activeElement)) {
        return
      }
      dialog.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus()
    }, 50)
    return () => {
      clearTimeout(timer)
    }
  }, [open, dialogRef])
}

function ModalActions({
  confirmLabel,
  confirmVariant,
  onClose,
  onConfirm,
  loading,
}: Pick<ModalProps, 'confirmLabel' | 'confirmVariant' | 'onClose' | 'onConfirm' | 'loading'>) {
  return (
    <div className="flex justify-end gap-3">
      <Button variant="ghost" onClick={onClose} disabled={loading}>
        Cancel
      </Button>
      {confirmLabel !== undefined && onConfirm !== undefined && (
        <Button variant={confirmVariant} onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      )}
    </div>
  )
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

  useBodyScrollLock(open)
  useModalKeyboard({ open, loading, onClose, dialogRef })
  useInitialModalFocus(open, dialogRef)

  if (!open) {
    return null
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50"
      onClick={(e) => {
        if (e.target === overlayRef.current) {onClose()}
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-surface rounded-xl shadow-xl max-w-md w-full mx-4 p-6"
      >
        <h3 id={titleId} className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">{title}</h3>
        <div className="text-neutral-600 dark:text-neutral-400 mb-6">{children}</div>
        <ModalActions confirmLabel={confirmLabel} confirmVariant={confirmVariant} onClose={onClose} onConfirm={onConfirm} loading={loading} />
      </div>
    </div>
  )
}
