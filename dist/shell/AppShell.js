"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppShell;
const jsx_runtime_1 = require("react/jsx-runtime");
const Topbar_1 = __importDefault(require("./Topbar"));
const Sidebar_1 = __importDefault(require("./Sidebar"));
/** The shared application shell: consistent topbar (brand + app switcher + theme
 *  toggle + account menu) and optional left nav, across every app. */
function AppShell({ appName, apps, currentKey, user, isAdmin, hubUrl, nav, themeToggle = true, children, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-neutral-50 dark:bg-neutral-900", children: [(0, jsx_runtime_1.jsx)(Topbar_1.default, { appName: appName, apps: apps, currentKey: currentKey, user: user, isAdmin: isAdmin, hubUrl: hubUrl, themeToggle: themeToggle }), (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto flex w-full max-w-[1400px]", children: [nav && nav.length > 0 && ((0, jsx_runtime_1.jsx)("aside", { className: "hidden w-60 shrink-0 border-r border-neutral-200 dark:border-neutral-700 md:block", children: (0, jsx_runtime_1.jsx)("div", { className: "sticky top-14", children: (0, jsx_runtime_1.jsx)(Sidebar_1.default, { groups: nav }) }) })), (0, jsx_runtime_1.jsx)("main", { className: "min-w-0 flex-1 px-4 py-6 sm:px-6", children: children })] })] }));
}
