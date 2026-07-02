"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Breadcrumbs;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const cn_1 = require("../cn");
/** Breadcrumb trail rendered by AppShell above the page content. Crumbs with an
 *  href are Next <Link>s (basePath auto-prepended); the last crumb is the current
 *  page (aria-current). */
function Breadcrumbs({ items, className }) {
    if (items.length === 0) {
        return null;
    }
    const last = items.length - 1;
    return ((0, jsx_runtime_1.jsx)("nav", { "aria-label": "Breadcrumb", className: (0, cn_1.cn)('mb-4', className), children: (0, jsx_runtime_1.jsx)("ol", { className: "flex flex-wrap items-center gap-1 text-sm", children: items.map((item, i) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-1", children: [i > 0 && (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500", "aria-hidden": true }), item.href && i !== last ? ((0, jsx_runtime_1.jsx)(link_1.default, { href: item.href, className: "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors", children: item.label })) : ((0, jsx_runtime_1.jsx)("span", { "aria-current": i === last ? 'page' : undefined, className: "font-medium text-neutral-900 dark:text-neutral-50", children: item.label }))] }, `${item.label}-${i}`))) }) }));
}
