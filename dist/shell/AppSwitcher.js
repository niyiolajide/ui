'use client';
"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppSwitcher;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Icons = __importStar(require("lucide-react"));
const lucide_react_1 = require("lucide-react");
const cn_1 = require("../cn");
/** Cross-app launcher — lists every sibling app from the registry. Present in every shell. */
function AppSwitcher({ apps, currentKey }) {
    const [open, setOpen] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const h = (e) => {
            if (ref.current && !ref.current.contains(e.target))
                setOpen(false);
        };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);
    if (!apps?.length)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: "relative", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setOpen((o) => !o), "aria-label": "Switch app", "aria-expanded": open, className: "p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors", children: (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutGrid, { className: "w-5 h-5" }) }), open && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute right-0 mt-1 w-64 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-elevated p-2 z-50", children: [(0, jsx_runtime_1.jsx)("p", { className: "px-2 py-1 meta-label", children: "Apps" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-1", children: apps.map((a) => {
                            const Icon = (Icons[a.icon || ''] || Icons.AppWindow);
                            const active = a.key === currentKey;
                            return ((0, jsx_runtime_1.jsxs)("a", { href: a.url, className: (0, cn_1.cn)('flex flex-col items-center gap-1.5 rounded-lg p-3 text-center text-xs font-medium transition-colors', active
                                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'), children: [(0, jsx_runtime_1.jsx)(Icon, { className: "w-5 h-5" }), a.name] }, a.key));
                        }) })] }))] }));
}
