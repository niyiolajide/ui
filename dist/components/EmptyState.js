"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmptyState;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
function EmptyState({ icon, title, description, actionLabel, actionHref }) {
    const renderIcon = () => {
        if (!icon)
            return null;
        const IconComponent = icon;
        return ((0, jsx_runtime_1.jsx)("div", { className: "mb-4 flex justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(IconComponent, { className: "w-8 h-8 text-primary-400", strokeWidth: 1.5 }) }) }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-12", children: [renderIcon(), (0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm mx-auto", children: description }), actionLabel && actionHref && ((0, jsx_runtime_1.jsxs)("a", { href: actionHref, className: "btn btn-primary inline-flex items-center gap-2", children: [actionLabel, (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "w-4 h-4" })] }))] }));
}
