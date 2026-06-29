"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Card;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../cn");
function Card({ children, title, hoverable = false, variant = 'default', className, ...rest }) {
    const variants = {
        default: 'card',
        compact: 'card p-4',
        outlined: 'bg-surface rounded-card border border-line p-6',
        tinted: 'bg-surface-muted rounded-card border border-line p-6 shadow-none',
        elevated: 'card shadow-elevated',
        interactive: 'card cursor-pointer hover:shadow-card-hover focus-within:ring-2 focus-within:ring-primary-500',
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)(variants[variant], hoverable && 'card-hover cursor-pointer', className), ...rest, children: [title && ((0, jsx_runtime_1.jsx)("h3", { className: "section-title mb-4", children: title })), children] }));
}
