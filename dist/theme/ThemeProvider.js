'use client';
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORAGE_KEY = void 0;
exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ThemeContext = (0, react_1.createContext)(undefined);
/** localStorage key for the persisted theme. Shared with ThemeScript (FOUC script). */
exports.STORAGE_KEY = 'theme';
function getSystemTheme() {
    if (typeof window === 'undefined')
        return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function applyTheme(theme) {
    const root = document.documentElement;
    const resolved = theme === 'system' ? getSystemTheme() : theme;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
}
function ThemeProvider({ children }) {
    const [theme, setThemeState] = (0, react_1.useState)('system');
    const [resolvedTheme, setResolvedTheme] = (0, react_1.useState)('light');
    // Initialize from localStorage on mount
    (0, react_1.useEffect)(() => {
        const stored = localStorage.getItem(exports.STORAGE_KEY);
        const initial = stored && ['light', 'dark', 'system'].includes(stored) ? stored : 'system';
        setThemeState(initial);
        applyTheme(initial);
        setResolvedTheme(initial === 'system' ? getSystemTheme() : initial);
    }, []);
    // Listen for system preference changes when theme is 'system'
    (0, react_1.useEffect)(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        function handleChange() {
            if (theme === 'system') {
                applyTheme('system');
                setResolvedTheme(getSystemTheme());
            }
        }
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);
    const setTheme = (0, react_1.useCallback)((newTheme) => {
        setThemeState(newTheme);
        localStorage.setItem(exports.STORAGE_KEY, newTheme);
        applyTheme(newTheme);
        setResolvedTheme(newTheme === 'system' ? getSystemTheme() : newTheme);
    }, []);
    return ((0, jsx_runtime_1.jsx)(ThemeContext.Provider, { value: { theme, setTheme, resolvedTheme }, children: children }));
}
function useTheme() {
    const context = (0, react_1.useContext)(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
