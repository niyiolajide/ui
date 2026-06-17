'use client';
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Input;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const cn_1 = require("../cn");
const lucide_react_1 = require("lucide-react");
function Input({ label, error, helperText, variant = 'default', density = 'default', className, id, type, 'aria-describedby': externalDescribedBy, ...props }) {
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const reactId = (0, react_1.useId)();
    const inputId = id || reactId;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;
    const isPassword = type === 'password';
    const variants = {
        default: '',
        subtle: 'bg-neutral-50 dark:bg-neutral-800/50 focus:bg-white dark:focus:bg-neutral-800',
    };
    const densities = {
        default: '',
        compact: 'px-3 py-2 text-sm',
    };
    const describedBy = [
        error ? errorId : null,
        helperText && !error ? helperTextId : null,
        externalDescribedBy,
    ].filter(Boolean).join(' ') || undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [label && ((0, jsx_runtime_1.jsxs)("label", { htmlFor: inputId, className: "label", children: [label, props.required && (0, jsx_runtime_1.jsx)("span", { className: "text-error-500 ml-0.5", "aria-hidden": "true", children: "*" })] })), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("input", { id: inputId, type: isPassword && showPassword ? 'text' : type, className: (0, cn_1.cn)('input', variants[variant], densities[density], error && 'input-error', isPassword && 'pr-10', className), "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, ...props }), isPassword && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setShowPassword(prev => !prev), className: "absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-800", "aria-label": showPassword ? 'Hide password' : 'Show password', children: showPassword ? (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { className: "w-4 h-4" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "w-4 h-4" }) }))] }), error && (0, jsx_runtime_1.jsx)("p", { id: errorId, className: "mt-1 text-sm text-error-500", role: "alert", children: error }), helperText && !error && (0, jsx_runtime_1.jsx)("p", { id: helperTextId, className: "mt-1 text-sm text-neutral-500 dark:text-neutral-400", children: helperText })] }));
}
