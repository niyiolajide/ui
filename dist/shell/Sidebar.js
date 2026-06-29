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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const Icons = __importStar(require("lucide-react"));
const cn_1 = require("../cn");
const ICONS = Icons;
function iconFor(name) {
    return ICONS[name ?? ''] ?? Icons.Dot;
}
/** Shared left nav. Active state from the current pathname. */
function Sidebar({ groups }) {
    const pathname = (0, navigation_1.usePathname)() || '';
    const isActive = (href) => pathname === href || pathname.startsWith(href + '/');
    return ((0, jsx_runtime_1.jsx)("nav", { className: "flex flex-col gap-5 p-3", children: groups.map((g, gi) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [g.label && (0, jsx_runtime_1.jsx)("p", { className: "px-3 pb-1 meta-label", children: g.label }), g.items.map((item) => {
                    const Icon = iconFor(item.icon);
                    const active = isActive(item.href);
                    return (
                    // Next <Link> (not raw <a>) so the app's basePath is auto-prepended
                    // (e.g. /dashboard → /finpulse/dashboard); raw hrefs would 404 at the origin root.
                    (0, jsx_runtime_1.jsxs)(link_1.default, { href: item.href, "aria-current": active ? 'page' : undefined, className: (0, cn_1.cn)('flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors', active
                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-50'), children: [(0, jsx_runtime_1.jsx)(Icon, { className: "w-4 h-4 shrink-0" }), item.label] }, item.href));
                })] }, gi))) }));
}
