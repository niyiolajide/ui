interface ResponsiveRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Desktop vertical alignment of the two sides. Default 'start'. */
    align?: 'start' | 'center';
    children: React.ReactNode;
}
/**
 * A row that STACKS vertically on phones and becomes a `justify-between` row at `sm`+.
 * Prevents the mobile content-squeeze where a fixed-width right block (value/controls/badge)
 * crushes a `min-w-0 truncate` left label inside the Pulse WebViews (~360px).
 *
 * Replaces a hand-rolled `<div className="flex items-start justify-between gap-4">`.
 * The left/content child should keep `min-w-0` (and `flex-1` if it should fill at `sm`+);
 * the right child can keep `flex-shrink-0`.
 */
export default function ResponsiveRow({ align, className, children, ...rest }: ResponsiveRowProps): import("react").JSX.Element;
export {};
