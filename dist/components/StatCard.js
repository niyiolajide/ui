"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StatCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../cn");
const DEFAULT_TONE_CLASSES = {
    card: '',
    icon: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400',
    value: 'text-neutral-900 dark:text-neutral-50',
};
const TONE_CLASSES = {
    success: {
        card: 'bg-success-50/50 dark:bg-success-900/20',
        icon: 'bg-success-100 dark:bg-success-900/40 text-success-700 dark:text-success-400',
        value: 'text-success-700 dark:text-success-400',
    },
    warning: {
        card: 'bg-warning-50/50 dark:bg-warning-900/20',
        icon: 'bg-warning-100 dark:bg-warning-900/40 text-warning-700 dark:text-warning-400',
        value: 'text-warning-700 dark:text-warning-400',
    },
    neutral: {
        card: 'bg-surface-muted',
        icon: 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300',
        value: 'text-neutral-900 dark:text-neutral-50',
    },
};
function renderable(node) {
    return node !== undefined && node !== null && node !== false;
}
function resolveTone(highlight, highlightTone, isPositiveTrend) {
    if (!highlight) {
        return null;
    }
    return highlightTone ?? (isPositiveTrend ? 'success' : 'neutral');
}
function TrendPill({ trend, isPositive, isNegative, }) {
    const trendClass = isPositive
        ? 'bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-400'
        : isNegative
            ? 'bg-error-50 dark:bg-error-900/30 text-error-700 dark:text-error-400'
            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300';
    return ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full', trendClass), children: [isPositive ? '\u2191' : isNegative ? '\u2193' : '', Math.abs(trend.value), "%"] }));
}
function StatCard({ label, value, subtitle, highlight = false, highlightTone, icon: Icon, trend, size = 'default', }) {
    const isPositiveTrend = trend !== undefined && trend.value > 0;
    const isNegativeTrend = trend !== undefined && trend.value < 0;
    const resolvedTone = resolveTone(highlight, highlightTone, isPositiveTrend);
    const toneClasses = resolvedTone ? TONE_CLASSES[resolvedTone] : DEFAULT_TONE_CLASSES;
    const supportingText = subtitle ?? trend?.label;
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('card', size === 'large' && 'md:col-span-2', toneClasses.card), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-3", children: [Icon && ((0, jsx_runtime_1.jsx)("div", { className: `p-2 rounded-lg ${toneClasses.icon}`, children: (0, jsx_runtime_1.jsx)(Icon, { className: "w-5 h-5" }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1", children: label }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-2", children: [(0, jsx_runtime_1.jsx)("p", { className: `${size === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'} font-bold tabular-nums ${toneClasses.value}`, children: value }), trend !== undefined && ((0, jsx_runtime_1.jsx)(TrendPill, { trend: trend, isPositive: isPositiveTrend, isNegative: isNegativeTrend }))] }), renderable(supportingText) && ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-1", children: supportingText }))] })] }) }));
}
