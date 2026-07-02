export interface PaletteCommand {
    key: string;
    label: string;
    hint?: string;
    /** Section key; undefined lands in the default "Go to" section. */
    group?: string;
    /** In-app destination — navigated with router.push (basePath applies). */
    href?: string;
    /** Absolute cross-app destination — navigated with a full page load. */
    url?: string;
}
export interface PaletteAppNavItem {
    key: string;
    label: string;
    href: string;
    surfaces?: string[];
}
/** Registry app shape the palette indexes for cross-app jumps (readApps() output). */
export interface PaletteApp {
    key: string;
    name: string;
    url: string;
    nav?: PaletteAppNavItem[];
}
export interface PaletteSection {
    group: string;
    label: string;
    items: {
        cmd: PaletteCommand;
        idx: number;
    }[];
}
export declare const DEFAULT_GROUP_LABELS: Record<string, string>;
/** Cross-app jump commands: every other app itself + its registry nav (web surface). */
export declare function appJumpCommands(apps: PaletteApp[], currentKey?: string): PaletteCommand[];
/** Fuzzy subsequence match; returns a score (lower = better) or -1 for no match. */
export declare function fuzzyScore(query: string, text: string): number;
export interface PaletteControllerOptions {
    commands: PaletteCommand[];
    apps?: PaletteApp[];
    currentKey?: string;
    groupLabels?: Record<string, string>;
    groupOrder?: string[];
    defaultOpen?: boolean;
}
export declare function usePaletteController({ commands, apps, currentKey, groupLabels, groupOrder, defaultOpen }: PaletteControllerOptions): {
    results: PaletteCommand[];
    grouped: PaletteSection[];
    select: (cmd: PaletteCommand | undefined) => void;
    onListKey: (e: React.KeyboardEvent) => void;
    open: boolean;
    setOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    query: string;
    setQuery: import("react").Dispatch<import("react").SetStateAction<string>>;
    active: number;
    setActive: import("react").Dispatch<import("react").SetStateAction<number>>;
    inputRef: import("react").RefObject<HTMLInputElement>;
    listRef: import("react").RefObject<HTMLUListElement>;
    close: () => void;
};
