'use client';
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastProvider = ToastProvider;
exports.useToast = useToast;
const jsx_runtime_1 = require("react/jsx-runtime");
// SH-2 — a self-contained, dependency-free toast system for the whole family.
// (Supersedes the prior no-op placeholder: rather than have every app wire its own
// toast lib, the design system owns the success/error/info moment so it's consistent
// and zero-boilerplate — wrap the app once in <ToastProvider>, then `useToast()`.)
//
// Visual language: surface card + left accent (teal for success, red for error,
// neutral for info), shadow-elevated, slide-up entrance. Token colors only.
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const cn_1 = require("../cn");
const ToastContext = (0, react_1.createContext)(null);
let _seq = 0;
function ToastProvider({ children }) {
    const [toasts, setToasts] = (0, react_1.useState)([]);
    const dismiss = (0, react_1.useCallback)((id) => {
        setToasts((list) => list.filter((t) => t.id !== id));
    }, []);
    const api = (0, react_1.useMemo)(() => {
        const push = (type, message, opts) => {
            const id = ++_seq;
            setToasts((list) => [
                ...list,
                { id, type, message, action: opts?.action, duration: opts?.duration ?? 4000 },
            ]);
        };
        return {
            toast: (message, opts) => push(opts?.type ?? 'info', message, opts),
            success: (message, opts) => push('success', message, opts),
            error: (message, opts) => push('error', message, opts),
            info: (message, opts) => push('info', message, opts),
            dismiss,
        };
    }, [dismiss]);
    return ((0, jsx_runtime_1.jsxs)(ToastContext.Provider, { value: api, children: [children, (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6", role: "region", "aria-label": "Notifications", children: toasts.map((t) => ((0, jsx_runtime_1.jsx)(ToastRow, { toast: t, onDismiss: dismiss }, t.id))) })] }));
}
const TONE = {
    success: { accent: 'border-l-primary-500', icon: lucide_react_1.CheckCircle2, iconColor: 'text-primary-600 dark:text-primary-400' },
    error: { accent: 'border-l-error-500', icon: lucide_react_1.AlertTriangle, iconColor: 'text-error-600 dark:text-error-400' },
    info: { accent: 'border-l-neutral-400', icon: lucide_react_1.Info, iconColor: 'text-neutral-500 dark:text-neutral-400' },
};
function ToastRow({ toast, onDismiss }) {
    (0, react_1.useEffect)(() => {
        if (toast.duration <= 0)
            return;
        const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, onDismiss]);
    const { accent, icon: Icon, iconColor } = TONE[toast.type];
    return ((0, jsx_runtime_1.jsxs)("div", { role: "status", "aria-live": toast.type === 'error' ? 'assertive' : 'polite', className: (0, cn_1.cn)('pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-l-4 border-neutral-200 bg-white p-4 shadow-elevated animate-fadeUp dark:border-neutral-700 dark:bg-neutral-800', accent), children: [(0, jsx_runtime_1.jsx)(Icon, { className: (0, cn_1.cn)('mt-0.5 h-5 w-5 shrink-0', iconColor), strokeWidth: 2 }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1 pt-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-neutral-900 dark:text-neutral-50", children: toast.message }), toast.action && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                            toast.action.onClick();
                            onDismiss(toast.id);
                        }, className: "mt-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300", children: toast.action.label }))] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onDismiss(toast.id), "aria-label": "Dismiss", className: "shrink-0 rounded p-0.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }) })] }));
}
function useToast() {
    const ctx = (0, react_1.useContext)(ToastContext);
    if (!ctx)
        throw new Error('useToast must be used within <ToastProvider>');
    return ctx;
}
