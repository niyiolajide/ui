"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResponsiveTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../cn");
/**
 * Wraps a `<table>` so it scrolls horizontally on phones instead of compressing its
 * columns to ~1 char inside the Pulse WebViews (~360px). The table keeps `minWidth`
 * (default 40rem) so columns retain their natural size.
 *
 * Replaces a bare `<table>` (or one only loosely wrapped) at narrow widths.
 */
function ResponsiveTable({ minWidth, className, children, style, ...rest }) {
    const mergedStyle = minWidth ? { ...style, '--table-min': minWidth } : style;
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('table-scroll', className), style: mergedStyle, ...rest, children: children }));
}
