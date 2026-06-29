'use client';
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ThemeToggle;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const ThemeProvider_1 = require("./ThemeProvider");
const themeConfig = {
    light: { icon: lucide_react_1.Sun, label: 'Light mode', next: 'dark' },
    dark: { icon: lucide_react_1.Moon, label: 'Dark mode', next: 'system' },
    system: { icon: lucide_react_1.Monitor, label: 'System mode', next: 'light' },
};
function ThemeToggle() {
    const { theme, setTheme } = (0, ThemeProvider_1.useTheme)();
    const config = themeConfig[theme];
    const Icon = config.icon;
    const tooltipId = 'theme-toggle-tooltip';
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative group", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => { setTheme(config.next); }, className: "p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors", "aria-label": `Current: ${config.label}. Click to switch.`, "aria-describedby": tooltipId, children: (0, jsx_runtime_1.jsx)(Icon, { className: "w-5 h-5" }) }), (0, jsx_runtime_1.jsx)("span", { id: tooltipId, role: "tooltip", className: "absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-xs font-medium text-white bg-neutral-800 dark:bg-neutral-700 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none transition-opacity z-50", children: config.label })] }));
}
