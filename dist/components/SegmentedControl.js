'use client';
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentedControl = SegmentedControl;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function SegmentedControl({ options, value, onChange, ariaLabel, size = 'md', className = '', }) {
    const id = (0, react_1.useId)();
    return ((0, jsx_runtime_1.jsx)("div", { role: "tablist", "aria-label": ariaLabel, className: `inline-flex rounded-lg bg-neutral-100 dark:bg-neutral-700 p-0.5 ${className}`, children: options.map((option) => ((0, jsx_runtime_1.jsxs)("button", { role: "tab", id: `${id}-tab-${option.value}`, "aria-selected": value === option.value, onClick: () => { onChange(option.value); }, className: `inline-flex items-center gap-1.5 rounded-md font-medium transition-colors ${size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'} ${value === option.value
                ? 'bg-surface text-neutral-900 dark:text-neutral-50 shadow-sm'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`, children: [option.icon, option.label] }, option.value))) }));
}
