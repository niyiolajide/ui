'use client';
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDrag = useDrag;
const react_1 = require("react");
/**
 * Pointer-drag for the floating Report panel. The handle element gets the
 * returned handlers; pointer capture keeps move/up events flowing to it even
 * when the cursor leaves the handle. `pos` is null until first positioned (the
 * panel then places itself, e.g. top-right) so we don't need window size on SSR.
 */
function useDrag() {
    const [pos, setPos] = (0, react_1.useState)(null);
    const offset = (0, react_1.useRef)(null);
    const onPointerDown = (0, react_1.useCallback)((event) => {
        const panel = event.currentTarget.closest('[data-report-panel]');
        if (panel === null) {
            return;
        }
        const rect = panel.getBoundingClientRect();
        offset.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        event.currentTarget.setPointerCapture(event.pointerId);
        setPos({ x: rect.left, y: rect.top });
    }, []);
    const onPointerMove = (0, react_1.useCallback)((event) => {
        if (offset.current === null) {
            return;
        }
        const maxX = window.innerWidth - 40;
        const maxY = window.innerHeight - 40;
        const x = Math.min(Math.max(0, event.clientX - offset.current.x), maxX);
        const y = Math.min(Math.max(0, event.clientY - offset.current.y), maxY);
        setPos({ x, y });
    }, []);
    const onPointerUp = (0, react_1.useCallback)((event) => {
        offset.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    }, []);
    return { pos, dragHandlers: { onPointerDown, onPointerMove, onPointerUp } };
}
