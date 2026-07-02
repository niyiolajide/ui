'use client';
"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = Tabs;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const cn_1 = require("../cn");
const Badge_1 = __importDefault(require("./Badge"));
const SIZES = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3 py-2 text-sm',
};
const tabClass = (active, size) => (0, cn_1.cn)('-mb-px inline-flex items-center gap-1.5 border-b-2 font-medium transition-colors', SIZES[size], active
    ? 'border-primary-600 dark:border-primary-400 text-primary-700 dark:text-primary-300'
    : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-600');
const isRouteActive = (pathname, href, exact) => exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
function TabContent({ item }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [item.icon, item.label, item.badge ? ((0, jsx_runtime_1.jsx)(Badge_1.default, { variant: item.badgeVariant ?? 'info', size: "sm", children: item.badge })) : null] }));
}
/**
 * Underline tab strip — the design-system home for both flavors of tab bar:
 * route-aware page tabs (items with `href`, active from the pathname, rendered
 * as Next <Link>s so basePath is auto-prepended) and controlled state tabs
 * (`value`/`onChange`). Count badges per tab render only when > 0.
 */
function Tabs({ items, value, onChange, ariaLabel, size = 'md', className = '', }) {
    const pathname = (0, navigation_1.usePathname)() || '';
    const allLinks = items.every((i) => i.href);
    const strip = items.map((item) => {
        if (item.href) {
            const active = isRouteActive(pathname, item.href, item.exact);
            return ((0, jsx_runtime_1.jsx)(link_1.default, { href: item.href, "aria-current": active ? 'page' : undefined, className: tabClass(active, size), children: (0, jsx_runtime_1.jsx)(TabContent, { item: item }) }, item.key));
        }
        const active = value === item.key;
        return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: allLinks ? undefined : 'tab', "aria-selected": active, onClick: () => onChange?.(item.key), className: tabClass(active, size), children: (0, jsx_runtime_1.jsx)(TabContent, { item: item }) }, item.key));
    });
    const stripClass = (0, cn_1.cn)('flex flex-wrap items-end gap-1 border-b border-line', className);
    return allLinks ? ((0, jsx_runtime_1.jsx)("nav", { "aria-label": ariaLabel, className: stripClass, children: strip })) : ((0, jsx_runtime_1.jsx)("div", { role: "tablist", "aria-label": ariaLabel, className: stripClass, children: strip }));
}
