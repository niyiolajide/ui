'use client';
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = Pagination;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
function Pagination({ currentPage, totalPages, totalItems, pageSize, onPageChange, className = '', }) {
    if (totalItems === 0)
        return null;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);
    return ((0, jsx_runtime_1.jsxs)("div", { className: `flex items-center justify-between ${className}`, children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-neutral-500 dark:text-neutral-400", children: ["Showing ", start, "\u2013", end, " of ", totalItems] }), totalPages > 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => onPageChange(currentPage - 1), disabled: currentPage <= 1, "aria-label": `Previous page (page ${currentPage - 1} of ${totalPages})`, className: "p-1.5 rounded-md text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:outline-none transition-colors", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { className: "w-4 h-4" }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-neutral-700 dark:text-neutral-300 tabular-nums px-2", children: [currentPage, " / ", totalPages] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => onPageChange(currentPage + 1), disabled: currentPage >= totalPages, "aria-label": `Next page (page ${currentPage + 1} of ${totalPages})`, className: "p-1.5 rounded-md text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:outline-none transition-colors", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "w-4 h-4" }) })] }))] }));
}
