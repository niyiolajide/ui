'use client';
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
/** Account dropdown — consistent across apps: identity, System Admin (admin only),
 *  and a hub-centric Sign out. */
function UserMenu({ user, isAdmin, hubUrl = 'http://localhost:4000', onSignOut, }) {
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
    const signOut = onSignOut || (() => { window.location.href = `${hubUrl}/login`; });
    const label = user?.name || user?.email || 'Account';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: "relative", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: () => setOpen((o) => !o), "aria-label": "Account menu", "aria-expanded": open, className: "flex items-center gap-1.5 p-1.5 pr-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300", children: (0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "w-4 h-4" }) }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: "w-3.5 h-3.5" })] }), open && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute right-0 mt-1 w-56 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-elevated py-1 z-50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-4 py-2 border-b border-neutral-100 dark:border-neutral-700", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-neutral-900 dark:text-neutral-50 truncate", children: label }), user?.email && user?.name && (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 truncate", children: user.email })] }), isAdmin && ((0, jsx_runtime_1.jsxs)("a", { href: `${hubUrl}/admin`, className: "flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { className: "w-4 h-4" }), "System Admin"] })), (0, jsx_runtime_1.jsxs)("button", { onClick: signOut, className: "w-full flex items-center gap-2.5 px-4 py-2 text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "w-4 h-4" }), "Sign out"] })] }))] }));
}
