'use client';
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_GROUP_LABELS = void 0;
exports.appJumpCommands = appJumpCommands;
exports.fuzzyScore = fuzzyScore;
exports.usePaletteController = usePaletteController;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const DEFAULT_GROUP = 'general';
const APPS_GROUP = 'apps';
exports.DEFAULT_GROUP_LABELS = {
    [DEFAULT_GROUP]: 'Go to',
    actions: 'Quick actions',
    [APPS_GROUP]: 'Other apps',
};
/** Cross-app jump commands: every other app itself + its registry nav (web surface). */
function appJumpCommands(apps, currentKey) {
    const out = [];
    for (const app of apps) {
        if (app.key === currentKey) {
            continue;
        }
        out.push({ key: `app:${app.key}`, label: app.name, hint: 'open app', group: APPS_GROUP, url: app.url });
        for (const item of app.nav ?? []) {
            if (item.surfaces && !item.surfaces.includes('web')) {
                continue;
            }
            out.push({
                key: `app:${app.key}:${item.key}`,
                label: `${app.name} · ${item.label}`,
                group: APPS_GROUP,
                url: app.url.replace(/\/$/, '') + item.href,
            });
        }
    }
    return out;
}
/** Fuzzy subsequence match; returns a score (lower = better) or -1 for no match. */
function fuzzyScore(query, text) {
    if (!query) {
        return 0;
    }
    const q = query.toLowerCase();
    const t = text.toLowerCase();
    let ti = 0;
    let score = 0;
    let lastMatch = -1;
    for (let qi = 0; qi < q.length; qi++) {
        const found = t.indexOf(q[qi], ti);
        if (found === -1) {
            return -1;
        }
        // Reward contiguous matches; penalize gaps.
        score += found - ti + (lastMatch >= 0 && found === lastMatch + 1 ? 0 : 1);
        lastMatch = found;
        ti = found + 1;
    }
    return score;
}
function usePaletteState(defaultOpen) {
    const [open, setOpen] = (0, react_1.useState)(defaultOpen);
    const [query, setQuery] = (0, react_1.useState)('');
    const [active, setActive] = (0, react_1.useState)(0);
    const inputRef = (0, react_1.useRef)(null);
    const listRef = (0, react_1.useRef)(null);
    const close = (0, react_1.useCallback)(() => {
        setOpen(false);
        setQuery('');
        setActive(0);
    }, []);
    // ⌘K / Ctrl+K to toggle; also accept the `open-command-palette` event.
    (0, react_1.useEffect)(() => {
        function onKey(e) {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen((o) => !o);
            }
        }
        function onEvent() {
            setOpen(true);
        }
        document.addEventListener('keydown', onKey);
        window.addEventListener('open-command-palette', onEvent);
        return () => {
            document.removeEventListener('keydown', onKey);
            window.removeEventListener('open-command-palette', onEvent);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (open) {
            // Focus after paint so the dialog is in the DOM.
            const id = requestAnimationFrame(() => inputRef.current?.focus());
            return () => { cancelAnimationFrame(id); };
        }
    }, [open]);
    return { open, setOpen, query, setQuery, active, setActive, inputRef, listRef, close };
}
function useCommandResults(commands, query) {
    const results = (0, react_1.useMemo)(() => {
        const scored = commands
            .map((c) => ({ cmd: c, score: fuzzyScore(query, `${c.label} ${c.hint ?? ''}`) }))
            .filter((r) => r.score >= 0);
        scored.sort((a, b) => a.score - b.score);
        return scored.map((r) => r.cmd);
    }, [query, commands]);
    return results;
}
function useGrouped(results, groupLabels, groupOrder) {
    return (0, react_1.useMemo)(() => {
        const byGroup = new Map();
        results.forEach((cmd, idx) => {
            const g = cmd.group ?? DEFAULT_GROUP;
            const items = byGroup.get(g);
            if (items === undefined) {
                byGroup.set(g, [{ cmd, idx }]);
            }
            else {
                items.push({ cmd, idx });
            }
        });
        const order = groupOrder ?? Array.from(byGroup.keys());
        const seen = new Set();
        const groups = [...order.filter((g) => byGroup.has(g)), ...Array.from(byGroup.keys())].filter((g) => {
            if (seen.has(g)) {
                return false;
            }
            seen.add(g);
            return true;
        });
        return groups.map((g) => ({ group: g, label: groupLabels[g] ?? g, items: byGroup.get(g) ?? [] }));
    }, [results, groupLabels, groupOrder]);
}
function useSelectCommand(close) {
    const router = (0, navigation_1.useRouter)();
    return (0, react_1.useCallback)((cmd) => {
        if (!cmd) {
            return;
        }
        close();
        if (cmd.url) {
            window.location.assign(cmd.url);
        }
        else if (cmd.href) {
            router.push(cmd.href);
        }
    }, [close, router]);
}
function useListKey({ active, setActive, results, select, close }) {
    return function onListKey(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            select(results[active]);
        }
        else if (e.key === 'Escape') {
            e.preventDefault();
            close();
        }
    };
}
function useBoundedActive(resultsLength, setActive) {
    (0, react_1.useEffect)(() => {
        setActive((a) => (a >= resultsLength ? 0 : a));
    }, [resultsLength, setActive]);
}
function useActiveScroll({ open, active, listRef }) {
    (0, react_1.useEffect)(() => {
        if (!open || !listRef.current) {
            return;
        }
        const el = listRef.current.querySelector(`[data-idx="${active}"]`);
        el?.scrollIntoView({ block: 'nearest' });
    }, [active, open, listRef]);
}
function usePaletteController({ commands, apps, currentKey, groupLabels, groupOrder, defaultOpen = false }) {
    const state = usePaletteState(defaultOpen);
    const all = (0, react_1.useMemo)(() => [...commands, ...appJumpCommands(apps ?? [], currentKey)], [commands, apps, currentKey]);
    const results = useCommandResults(all, state.query);
    const grouped = useGrouped(results, { ...exports.DEFAULT_GROUP_LABELS, ...groupLabels }, groupOrder);
    useBoundedActive(results.length, state.setActive);
    const select = useSelectCommand(state.close);
    const onListKey = useListKey({ active: state.active, setActive: state.setActive, results, select, close: state.close });
    useActiveScroll({ open: state.open, active: state.active, listRef: state.listRef });
    return { ...state, results, grouped, select, onListKey };
}
