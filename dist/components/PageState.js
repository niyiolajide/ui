"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageErrorState = PageErrorState;
exports.PageEmptyState = PageEmptyState;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const cn_1 = require("../cn");
function PageErrorState({ message, onRetry, retryLabel = 'Try again', className, }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('rounded-lg border border-error-200 dark:border-error-800 bg-error-50 dark:bg-error-900/30 p-4', className), role: "alert", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "mt-0.5 h-4 w-4 text-error-700 dark:text-error-400" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-error-700 dark:text-error-400", children: message })] }), onRetry && ((0, jsx_runtime_1.jsx)("button", { onClick: onRetry, className: "shrink-0 text-sm font-medium text-error-700 dark:text-error-400 hover:text-error-800 dark:hover:text-error-300 underline", children: retryLabel }))] }) }));
}
function PageEmptyState({ title, description, actionLabel, actionHref, className, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('rounded-lg border border-neutral-200 dark:border-neutral-700 bg-surface p-8 text-center', className), children: [(0, jsx_runtime_1.jsx)("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-700", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Inbox, { className: "h-6 w-6 text-neutral-600 dark:text-neutral-400" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "text-base font-semibold text-neutral-900 dark:text-neutral-50", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "mx-auto mt-2 max-w-md text-sm text-neutral-600 dark:text-neutral-400", children: description }), actionLabel && actionHref && ((0, jsx_runtime_1.jsx)("a", { href: actionHref, className: "mt-5 inline-flex items-center rounded-md bg-primary-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-600", children: actionLabel }))] }));
}
