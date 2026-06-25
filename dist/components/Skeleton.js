"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Skeleton;
exports.SkeletonText = SkeletonText;
exports.SkeletonCard = SkeletonCard;
exports.SkeletonStat = SkeletonStat;
exports.SkeletonTable = SkeletonTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../cn");
const radius = { sm: 'rounded', md: 'rounded-md', lg: 'rounded-lg', full: 'rounded-full' };
function Skeleton({ className, rounded = 'md', ...props }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('relative isolate overflow-hidden bg-neutral-200 dark:bg-neutral-700 h-4 w-full', radius[rounded], className), "aria-hidden": "true", ...props, children: (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10" }) }));
}
/** A block of N text lines; the last line is shortened so it reads like a paragraph. */
function SkeletonText({ lines = 3, className }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('space-y-2', className), "aria-hidden": "true", children: Array.from({ length: lines }).map((_, i) => ((0, jsx_runtime_1.jsx)(Skeleton, { className: (0, cn_1.cn)('h-3.5', i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full') }, i))) }));
}
/** Card-shaped placeholder (avatar/icon + title + subtitle) for list/grid loading. */
function SkeletonCard({ className }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('card', className), "aria-hidden": "true", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(Skeleton, { rounded: "lg", className: "h-10 w-10 shrink-0" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-2", children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-1/3" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-3 w-1/2" })] })] }) }));
}
/** StatCard-shaped placeholder — mirrors `StatCard` so dashboards don't reflow on load. */
function SkeletonStat({ className }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('card', className), "aria-hidden": "true", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-3", children: [(0, jsx_runtime_1.jsx)(Skeleton, { rounded: "lg", className: "h-9 w-9 shrink-0" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-2", children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: "h-3 w-20" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-7 w-28" })] })] }) }));
}
/** Table-row placeholder; first column is narrower to read like a label column. */
function SkeletonTable({ rows = 5, cols = 4, className }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-full space-y-3', className), "aria-hidden": "true", children: Array.from({ length: rows }).map((_, r) => ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-4", children: Array.from({ length: cols }).map((_, c) => ((0, jsx_runtime_1.jsx)(Skeleton, { className: (0, cn_1.cn)('h-4', c === 0 ? 'w-1/4' : 'flex-1') }, c))) }, r))) }));
}
