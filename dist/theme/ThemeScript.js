"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.THEME_STORAGE_KEY = void 0;
exports.themeScriptSource = themeScriptSource;
exports.default = ThemeScript;
const jsx_runtime_1 = require("react/jsx-runtime");
const ThemeProvider_1 = require("./ThemeProvider");
/** localStorage key the ThemeProvider reads/writes. Re-export of ThemeProvider's STORAGE_KEY. */
exports.THEME_STORAGE_KEY = ThemeProvider_1.STORAGE_KEY;
/**
 * Returns the raw JS (no <script> wrapper) that resolves + applies the theme class on
 * <html> before paint. Use this if you need to embed the logic yourself; most consumers
 * should render <ThemeScript /> instead.
 */
function themeScriptSource(storageKey = exports.THEME_STORAGE_KEY) {
    return `(function(){try{var t=localStorage.getItem('${storageKey}');var r=t;if(!t||t==='system'){r=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.add(r)}catch(e){}})();`;
}
/**
 * Inline <script> that prevents the dark-mode FOUC. Render once inside <head> of the
 * root layout, above the app. It only ADDS the resolved class (light|dark) pre-hydration;
 * the ThemeProvider takes over reconciliation after mount.
 */
function ThemeScript({ storageKey = exports.THEME_STORAGE_KEY, nonce } = {}) {
    return ((0, jsx_runtime_1.jsx)("script", { nonce: nonce, dangerouslySetInnerHTML: { __html: themeScriptSource(storageKey) } }));
}
