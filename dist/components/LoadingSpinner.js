"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoadingSpinner;
const jsx_runtime_1 = require("react/jsx-runtime");
function LoadingSpinner({ message = 'Loading...', fullPage = true, className }) {
    const content = ((0, jsx_runtime_1.jsxs)("div", { className: "text-center", role: "status", children: [(0, jsx_runtime_1.jsx)("div", { className: "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-4 text-neutral-600 dark:text-neutral-400", children: message })] }));
    if (fullPage) {
        return ((0, jsx_runtime_1.jsx)("div", { className: `min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center${className ? ` ${className}` : ''}`, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: `flex items-center justify-center py-12${className ? ` ${className}` : ''}`, children: content }));
}
