'use client'

import { useCallback, useRef, useState } from 'react'

export interface Point { x: number; y: number }

/**
 * Pointer-drag for the floating Report panel. The handle element gets the
 * returned handlers; pointer capture keeps move/up events flowing to it even
 * when the cursor leaves the handle. `pos` is null until first positioned (the
 * panel then places itself, e.g. top-right) so we don't need window size on SSR.
 */
export function useDrag() {
  const [pos, setPos] = useState<Point | null>(null)
  const offset = useRef<Point | null>(null)

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    // Don't start a drag when the press lands on a control (minimize/close) in
    // the header — let that button receive its click instead.
    const target = event.target
    if (target instanceof Element && target.closest('button') !== null) { return }
    const panel = event.currentTarget.closest('[data-report-panel]')
    if (panel === null) { return }
    const rect = panel.getBoundingClientRect()
    offset.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    event.currentTarget.setPointerCapture(event.pointerId)
    setPos({ x: rect.left, y: rect.top })
  }, [])

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (offset.current === null) { return }
    const maxX = window.innerWidth - 40
    const maxY = window.innerHeight - 40
    const x = Math.min(Math.max(0, event.clientX - offset.current.x), maxX)
    const y = Math.min(Math.max(0, event.clientY - offset.current.y), maxY)
    setPos({ x, y })
  }, [])

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLElement>) => {
    offset.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }, [])

  return { pos, dragHandlers: { onPointerDown, onPointerMove, onPointerUp } }
}
