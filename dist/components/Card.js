"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Card;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../cn");
function Card({ children, title, hoverable = false, variant = 'default', className, ...rest }) {
    const variants = {
        default: 'card',
        compact: 'card p-4',
        outlined: 'bg-white dark:bg-neutral-800 rounded-card border border-neutral-200 dark:border-neutral-700 p-6',
        tinted: 'bg-neutral-50 dark:bg-neutral-800/50 rounded-card border border-neutral-200 dark:border-neutral-700 p-6 shadow-none',
        elevated: 'card shadow-elevated',
        interactive: 'card cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-primary-500',
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)(variants[variant], hoverable && 'card-hover cursor-pointer', className), ...rest, children: [title && ((0, jsx_runtime_1.jsx)("h3", { className: "section-title mb-4", children: title })), children] }));
}
