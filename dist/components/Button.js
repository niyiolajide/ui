"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Button;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../cn");
const BUTTON_VARIANTS = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    danger: 'btn btn-danger',
    ghost: 'btn text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-primary-500',
    outline: 'btn bg-surface text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-surface-muted',
    neutral: 'btn bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200',
};
const BUTTON_SIZES = {
    xs: 'px-2.5 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3 text-lg',
};
const ICON_SIZES = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
};
function Button({ variant = 'primary', size = 'md', loading = false, loadingLabel, leftIcon: LeftIcon, rightIcon: RightIcon, className, children, disabled, ...props }) {
    const isDisabled = disabled === true || loading;
    return ((0, jsx_runtime_1.jsx)("button", { className: (0, cn_1.cn)(BUTTON_VARIANTS[variant], BUTTON_SIZES[size], loading && 'opacity-70 cursor-not-allowed', className), disabled: isDisabled, "aria-busy": loading || undefined, ...props, children: loading ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-current", role: "status", "aria-label": "Loading" }), loadingLabel ?? children] })) : ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-2", children: [LeftIcon && (0, jsx_runtime_1.jsx)(LeftIcon, { className: ICON_SIZES[size] }), children, RightIcon && (0, jsx_runtime_1.jsx)(RightIcon, { className: ICON_SIZES[size] })] })) }));
}
