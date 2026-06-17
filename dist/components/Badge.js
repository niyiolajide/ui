"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Badge;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../cn");
function Badge({ children, variant = 'neutral', size = 'md', className }) {
    const variants = {
        success: 'badge-success',
        warning: 'badge-warning',
        error: 'badge-error',
        neutral: 'badge-neutral',
        info: 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400',
    };
    const sizes = {
        sm: 'px-2 py-0.5 text-[11px]',
        md: 'px-3 py-1 text-xs',
    };
    return ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('badge', sizes[size], variants[variant], className), children: children }));
}
