'use client';
"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Modal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Button_1 = __importDefault(require("./Button"));
function Modal({ open, onClose, title, children, confirmLabel, confirmVariant = 'primary', onConfirm, loading = false, }) {
    const overlayRef = (0, react_1.useRef)(null);
    const dialogRef = (0, react_1.useRef)(null);
    const titleId = (0, react_1.useId)();
    (0, react_1.useEffect)(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);
    // Focus trap and Escape key
    const handleKeyDown = (0, react_1.useCallback)((e) => {
        if (e.key === 'Escape' && !loading) {
            onClose();
            return;
        }
        if (e.key === 'Tab' && dialogRef.current) {
            const focusable = dialogRef.current.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
            if (focusable.length === 0)
                return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            }
            else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    }, [onClose, loading]);
    // Keydown listener (focus trap + Escape). Re-binds when handleKeyDown changes.
    (0, react_1.useEffect)(() => {
        if (!open)
            return;
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, handleKeyDown]);
    // Auto-focus the first focusable element — ONCE, when the modal opens.
    // Deps are intentionally just [open]: the previous version also depended on
    // handleKeyDown, so any consumer re-render that changed handleKeyDown's identity
    // (e.g. an unstable onClose/loading) re-ran this effect and yanked the cursor
    // back to the first input on every keystroke. The contains() guard is belt-and-
    // suspenders: even if this ever re-runs, it must never steal focus from a control
    // the user is already editing inside the dialog.
    (0, react_1.useEffect)(() => {
        if (!open)
            return;
        const timer = setTimeout(() => {
            const dialog = dialogRef.current;
            if (!dialog || dialog.contains(document.activeElement))
                return;
            const focusable = dialog.querySelector('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])');
            focusable?.focus();
        }, 50);
        return () => clearTimeout(timer);
    }, [open]);
    if (!open)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { ref: overlayRef, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", onClick: (e) => {
            if (e.target === overlayRef.current)
                onClose();
        }, role: "presentation", children: (0, jsx_runtime_1.jsxs)("div", { ref: dialogRef, role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, className: "bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6", children: [(0, jsx_runtime_1.jsx)("h3", { id: titleId, className: "text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "text-neutral-600 dark:text-neutral-400 mb-6", children: children }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-3", children: [(0, jsx_runtime_1.jsx)(Button_1.default, { variant: "ghost", onClick: onClose, disabled: loading, children: "Cancel" }), confirmLabel && onConfirm && ((0, jsx_runtime_1.jsx)(Button_1.default, { variant: confirmVariant, onClick: onConfirm, loading: loading, children: confirmLabel }))] })] }) }));
}
