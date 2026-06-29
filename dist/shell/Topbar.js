"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Topbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const AppSwitcher_1 = __importDefault(require("./AppSwitcher"));
const UserMenu_1 = __importDefault(require("./UserMenu"));
const ThemeToggle_1 = __importDefault(require("../theme/ThemeToggle"));
/** Shared top bar: brand + app switcher + theme toggle + account menu. */
function Topbar({ appName, apps, currentKey, user, isAdmin, hubUrl, left, actions, themeToggle = true, }) {
    return ((0, jsx_runtime_1.jsxs)("header", { className: "sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-neutral-200 dark:border-neutral-700 bg-surface px-4 backdrop-blur", children: [left, (0, jsx_runtime_1.jsx)("span", { className: "font-display text-lg leading-none text-neutral-900 dark:text-neutral-50", children: appName }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-auto flex items-center gap-1", children: [actions, (0, jsx_runtime_1.jsx)(AppSwitcher_1.default, { apps: apps, currentKey: currentKey }), themeToggle && (0, jsx_runtime_1.jsx)(ThemeToggle_1.default, {}), (0, jsx_runtime_1.jsx)(UserMenu_1.default, { user: user, isAdmin: isAdmin, hubUrl: hubUrl })] })] }));
}
