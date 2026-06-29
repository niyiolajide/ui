"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PageHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
function PageHeader({ title, subtitle, breadcrumbs, actions }) {
    const hasActions = actions !== undefined && actions !== null && actions !== false;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [breadcrumbs && breadcrumbs.length > 0 && ((0, jsx_runtime_1.jsx)("nav", { "aria-label": "Breadcrumb", className: "flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 mb-2", children: breadcrumbs.map((crumb, i) => ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [i > 0 && (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-neutral-300 dark:text-neutral-600", children: "/" }), crumb.href ? ((0, jsx_runtime_1.jsx)("a", { href: crumb.href, className: "hover:text-primary-600 dark:hover:text-primary-400 transition-colors", children: crumb.label })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-neutral-900 dark:text-neutral-50 font-medium", children: crumb.label }))] }, i))) })), (0, jsx_runtime_1.jsx)("h1", { className: "page-title", children: title }), subtitle && (0, jsx_runtime_1.jsx)("p", { className: "page-subtitle mt-1", children: subtitle })] }), hasActions && ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-2 shrink-0", children: actions }))] }));
}
