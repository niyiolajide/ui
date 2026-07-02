'use client';
"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_RANGES = void 0;
exports.rangeToDays = rangeToDays;
exports.RangeSelector = RangeSelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const cn_1 = require("../cn");
exports.DEFAULT_RANGES = [
    { key: '7d', label: '7d', days: 7 },
    { key: '30d', label: '30d', days: 30 },
    { key: '90d', label: '90d', days: 90 },
    { key: '1y', label: '1y', days: 365 },
    { key: 'all', label: 'All' },
];
/** Days for a range key, `fallback` when the key is unknown or open-ended ("all"). */
function rangeToDays(key, options = exports.DEFAULT_RANGES, fallback = 30) {
    return options.find((r) => r.key === key)?.days ?? fallback;
}
const SEGMENT = 'inline-flex items-center rounded-md font-medium transition-colors';
const SEGMENT_ACTIVE = 'bg-surface text-neutral-900 dark:text-neutral-50 shadow-sm';
const SEGMENT_IDLE = 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300';
/**
 * Standard time-window control. Two flavors:
 * - `hrefFor`: renders links (server-friendly, range lives in the URL — takes precedence)
 * - `onChange`: renders a controlled tablist (range lives in client state)
 * Visual language matches SegmentedControl.
 */
function RangeSelector({ value, options = exports.DEFAULT_RANGES, ariaLabel = 'Time range', size = 'md', className, onChange, hrefFor, }) {
    const sizeCls = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm';
    const wrap = (0, cn_1.cn)('inline-flex rounded-lg bg-neutral-100 dark:bg-neutral-700 p-0.5', className);
    const segCls = (active) => (0, cn_1.cn)(SEGMENT, sizeCls, active ? SEGMENT_ACTIVE : SEGMENT_IDLE);
    if (hrefFor) {
        return ((0, jsx_runtime_1.jsx)("nav", { "aria-label": ariaLabel, className: wrap, children: options.map((r) => ((0, jsx_runtime_1.jsx)(link_1.default, { href: hrefFor(r.key), scroll: false, "aria-current": r.key === value ? 'true' : undefined, className: segCls(r.key === value), children: r.label }, r.key))) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { role: "tablist", "aria-label": ariaLabel, className: wrap, children: options.map((r) => ((0, jsx_runtime_1.jsx)(RangeTab, { option: r, selected: r.key === value, onChange: onChange, className: segCls(r.key === value) }, r.key))) }));
}
function RangeTab({ option, selected, onChange, className, }) {
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "tab", "aria-selected": selected, onClick: () => {
            onChange?.(option.key);
        }, className: className, children: option.label }));
}
