type Theme = 'light' | 'dark' | 'system';
interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    /** The resolved theme (always 'light' or 'dark', never 'system') */
    resolvedTheme: 'light' | 'dark';
}
export declare function ThemeProvider({ children }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
export declare function useTheme(): ThemeContextValue;
export {};
