'use client';
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Input;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const cn_1 = require("../cn");
const lucide_react_1 = require("lucide-react");
const INPUT_VARIANTS = {
    default: '',
    subtle: 'bg-surface-muted focus:bg-surface',
};
const INPUT_DENSITIES = {
    default: '',
    compact: 'px-3 py-2 text-sm',
};
function PasswordToggle({ showPassword, onToggle, }) {
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onToggle, className: "absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-800", "aria-label": showPassword ? 'Hide password' : 'Show password', children: showPassword ? (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { className: "w-4 h-4" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "w-4 h-4" }) }));
}
function describedByIds({ errorId, helperTextId, externalDescribedBy, hasError, hasHelperText, }) {
    const ids = [hasError ? errorId : null, hasHelperText ? helperTextId : null, externalDescribedBy];
    return ids.filter(Boolean).join(' ') || undefined;
}
function InputLabel({ inputId, label, required, }) {
    if (label === undefined) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("label", { htmlFor: inputId, className: "label", children: [label, required && (0, jsx_runtime_1.jsx)("span", { className: "text-error-500 ml-0.5", "aria-hidden": "true", children: "*" })] }));
}
function Input({ label, error, helperText, variant = 'default', density = 'default', className, id, type, 'aria-describedby': externalDescribedBy, ...props }) {
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const reactId = (0, react_1.useId)();
    const inputId = id ?? reactId;
    const errorId = `${inputId}-error`;
    const helperTextId = `${inputId}-helper`;
    const isPassword = type === 'password';
    const describedBy = describedByIds({
        errorId,
        helperTextId,
        externalDescribedBy,
        hasError: error !== undefined,
        hasHelperText: helperText !== undefined && error === undefined,
    });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(InputLabel, { inputId: inputId, label: label, required: props.required === true }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("input", { id: inputId, type: isPassword && showPassword ? 'text' : type, className: (0, cn_1.cn)('input', INPUT_VARIANTS[variant], INPUT_DENSITIES[density], error && 'input-error', isPassword && 'pr-10', className), "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, ...props }), isPassword && ((0, jsx_runtime_1.jsx)(PasswordToggle, { showPassword: showPassword, onToggle: () => { setShowPassword((prev) => !prev); } }))] }), error && (0, jsx_runtime_1.jsx)("p", { id: errorId, className: "mt-1 text-sm text-error-500", role: "alert", children: error }), helperText && !error && (0, jsx_runtime_1.jsx)("p", { id: helperTextId, className: "mt-1 text-sm text-neutral-500 dark:text-neutral-400", children: helperText })] }));
}
