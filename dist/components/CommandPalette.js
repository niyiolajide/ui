'use client';
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPalette = CommandPalette;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const CommandPalette_hooks_1 = require("./CommandPalette.hooks");
/**
 * ⌘K command palette (design-system generalization of FinPulse's, per UX review R4).
 * Searches the app-provided `commands` (resolved nav + quick actions — the server
 * layout resolves them from the control bus; this client component can't) plus a
 * cross-app jump index derived from the registry `apps` (readApps() output): every
 * other app and its web-surface nav become "AppName · Screen" entries that navigate
 * with a full page load. Fuzzy subsequence match, full keyboard nav (⌘K/↑/↓/Enter/Esc).
 * Render into the AppShell topbar `actions` slot.
 */
function CommandPalette(props) {
    const { open, setOpen, query, setQuery, active, setActive, inputRef, listRef, close, results, grouped, select, onListKey, } = (0, CommandPalette_hooks_1.usePaletteController)(props);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(PaletteTrigger, { onOpen: () => { setOpen(true); } }), open && ((0, jsx_runtime_1.jsxs)("div", { className: "fixed inset-0 z-[9999] flex items-start justify-center bg-ink/50 p-4 pt-[12vh]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Close command palette", className: "absolute inset-0 cursor-default", onClick: close }), (0, jsx_runtime_1.jsxs)("div", { role: "dialog", "aria-modal": "true", "aria-label": "Command palette", tabIndex: -1, className: "relative w-full max-w-lg overflow-hidden rounded-2xl bg-surface shadow-elevated", children: [(0, jsx_runtime_1.jsx)(PaletteInput, { inputRef: inputRef, query: query, placeholder: props.placeholder ?? 'Search…', onQueryChange: setQuery, onKeyDown: onListKey }), (0, jsx_runtime_1.jsx)(PaletteResults, { listRef: listRef, results: results, grouped: grouped, active: active, onActivate: setActive, onSelect: select })] })] }))] }));
}
function PaletteTrigger({ onOpen }) {
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: onOpen, "aria-label": "Open command palette", className: "flex items-center gap-2 rounded-lg border border-line bg-canvas px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-ink", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "hidden sm:inline", children: "Search" }), (0, jsx_runtime_1.jsx)("kbd", { className: "hidden rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-xs sm:inline", children: "\u2318K" })] }));
}
function PaletteInput({ inputRef, query, placeholder, onQueryChange, onKeyDown, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 border-b border-line px-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "h-4 w-4 shrink-0 text-muted" }), (0, jsx_runtime_1.jsx)("input", { ref: inputRef, value: query, onChange: (e) => { onQueryChange(e.target.value); }, onKeyDown: onKeyDown, placeholder: placeholder, "aria-label": "Search commands", className: "w-full bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-muted" }), (0, jsx_runtime_1.jsx)("kbd", { className: "hidden shrink-0 rounded border border-line bg-canvas px-1.5 py-0.5 font-mono text-xs text-muted sm:inline", children: "Esc" })] }));
}
function PaletteResults({ listRef, results, grouped, active, onActivate, onSelect, }) {
    return ((0, jsx_runtime_1.jsxs)("ul", { ref: listRef, className: "max-h-[55vh] overflow-y-auto py-2", children: [results.length === 0 && (0, jsx_runtime_1.jsx)("li", { className: "px-4 py-8 text-center text-sm text-muted", children: "No results" }), grouped.map((section) => ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("div", { className: "px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-muted", children: section.label }), (0, jsx_runtime_1.jsx)("ul", { children: section.items.map(({ cmd, idx }) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(PaletteOption, { cmd: cmd, idx: idx, active: idx === active, onActivate: onActivate, onSelect: onSelect }) }, cmd.key))) })] }, section.group)))] }));
}
function PaletteOption({ cmd, idx, active, onActivate, onSelect, }) {
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "data-idx": idx, "aria-current": active ? 'true' : undefined, onMouseEnter: () => { onActivate(idx); }, onClick: () => { onSelect(cmd); }, className: `flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors ${active ? 'bg-canvas text-ink' : 'text-muted hover:text-ink'}`, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-ink", children: cmd.label }), cmd.hint && (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: cmd.hint })] }), active && (0, jsx_runtime_1.jsx)(lucide_react_1.CornerDownLeft, { className: "h-3.5 w-3.5 shrink-0 text-muted" })] }));
}
