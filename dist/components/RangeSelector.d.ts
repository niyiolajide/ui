export interface RangeOption<T extends string = string> {
    key: T;
    label: string;
    /** Window length in days; omit for open-ended options like "all". */
    days?: number;
}
export declare const DEFAULT_RANGES: RangeOption[];
/** Days for a range key, `fallback` when the key is unknown or open-ended ("all"). */
export declare function rangeToDays<T extends string>(key: T | undefined, options?: RangeOption<T>[], fallback?: number): number;
/**
 * Standard time-window control. Two flavors:
 * - `hrefFor`: renders links (server-friendly, range lives in the URL — takes precedence)
 * - `onChange`: renders a controlled tablist (range lives in client state)
 * Visual language matches SegmentedControl.
 */
export declare function RangeSelector<T extends string>({ value, options, ariaLabel, size, className, onChange, hrefFor, }: {
    value: T;
    options?: RangeOption<T>[];
    ariaLabel?: string;
    size?: 'sm' | 'md';
    className?: string;
    onChange?: (key: T) => void;
    hrefFor?: (key: T) => string;
}): import("react").JSX.Element;
