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
const FOCUSABLE_SELECTOR = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');
function useBodyScrollLock(open) {
    (0, react_1.useEffect)(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);
}
function trapTab(e, dialog) {
    const focusable = dialog.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusable.length === 0) {
        return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    }
    else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
}
function useModalKeyboard({ open, loading, onClose, dialogRef, }) {
    const handleKeyDown = (0, react_1.useCallback)((e) => {
        if (e.key === 'Escape' && !loading) {
            onClose();
            return;
        }
        const dialog = dialogRef.current;
        if (e.key === 'Tab' && dialog) {
            trapTab(e, dialog);
        }
    }, [onClose, loading, dialogRef]);
    (0, react_1.useEffect)(() => {
        if (!open) {
            return;
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, handleKeyDown]);
}
function useInitialModalFocus(open, dialogRef) {
    (0, react_1.useEffect)(() => {
        if (!open) {
            return;
        }
        const timer = setTimeout(() => {
            const dialog = dialogRef.current;
            if (!dialog || dialog.contains(document.activeElement)) {
                return;
            }
            dialog.querySelector(FOCUSABLE_SELECTOR)?.focus();
        }, 50);
        return () => {
            clearTimeout(timer);
        };
    }, [open, dialogRef]);
}
function ModalActions({ confirmLabel, confirmVariant, onClose, onConfirm, loading, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-3", children: [(0, jsx_runtime_1.jsx)(Button_1.default, { variant: "ghost", onClick: onClose, disabled: loading, children: "Cancel" }), confirmLabel !== undefined && onConfirm !== undefined && ((0, jsx_runtime_1.jsx)(Button_1.default, { variant: confirmVariant, onClick: onConfirm, loading: loading, children: confirmLabel }))] }));
}
function Modal({ open, onClose, title, children, confirmLabel, confirmVariant = 'primary', onConfirm, loading = false, }) {
    const overlayRef = (0, react_1.useRef)(null);
    const dialogRef = (0, react_1.useRef)(null);
    const titleId = (0, react_1.useId)();
    useBodyScrollLock(open);
    useModalKeyboard({ open, loading, onClose, dialogRef });
    useInitialModalFocus(open, dialogRef);
    if (!open) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: overlayRef, className: "fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50", onClick: (e) => {
            if (e.target === overlayRef.current) {
                onClose();
            }
        }, role: "presentation", children: (0, jsx_runtime_1.jsxs)("div", { ref: dialogRef, role: "dialog", "aria-modal": "true", "aria-labelledby": titleId, className: "bg-surface rounded-xl shadow-xl max-w-md w-full mx-4 p-6", children: [(0, jsx_runtime_1.jsx)("h3", { id: titleId, className: "text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "text-neutral-600 dark:text-neutral-400 mb-6", children: children }), (0, jsx_runtime_1.jsx)(ModalActions, { confirmLabel: confirmLabel, confirmVariant: confirmVariant, onClose: onClose, onConfirm: onConfirm, loading: loading })] }) }));
}
