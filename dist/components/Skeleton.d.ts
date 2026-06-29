import type { HTMLAttributes } from 'react';
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    rounded?: 'sm' | 'md' | 'lg' | 'full';
}
export default function Skeleton({ className, rounded, ...props }: SkeletonProps): import("react").JSX.Element;
/** A block of N text lines; the last line is shortened so it reads like a paragraph. */
export declare function SkeletonText({ lines, className }: {
    lines?: number;
    className?: string;
}): import("react").JSX.Element;
/** Card-shaped placeholder (avatar/icon + title + subtitle) for list/grid loading. */
export declare function SkeletonCard({ className }: {
    className?: string;
}): import("react").JSX.Element;
/** StatCard-shaped placeholder — mirrors `StatCard` so dashboards don't reflow on load. */
export declare function SkeletonStat({ className }: {
    className?: string;
}): import("react").JSX.Element;
/** Table-row placeholder; first column is narrower to read like a label column. */
export declare function SkeletonTable({ rows, cols, className }: {
    rows?: number;
    cols?: number;
    className?: string;
}): import("react").JSX.Element;
export {};
