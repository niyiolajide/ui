"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResponsiveRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../cn");
/**
 * A row that STACKS vertically on phones and becomes a `justify-between` row at `sm`+.
 * Prevents the mobile content-squeeze where a fixed-width right block (value/controls/badge)
 * crushes a `min-w-0 truncate` left label inside the Pulse WebViews (~360px).
 *
 * Replaces a hand-rolled `<div className="flex items-start justify-between gap-4">`.
 * The left/content child should keep `min-w-0` (and `flex-1` if it should fill at `sm`+);
 * the right child can keep `flex-shrink-0`.
 */
function ResponsiveRow({ align = 'start', className, children, ...rest }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('responsive-row', align === 'center' && 'responsive-row-center', className), ...rest, children: children }));
}
