interface ResponsiveTableProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Min width the table keeps before scrolling (CSS length). Default 40rem. */
    minWidth?: string;
    /** A single `<table>` element. */
    children: React.ReactNode;
}
/**
 * Wraps a `<table>` so it scrolls horizontally on phones instead of compressing its
 * columns to ~1 char inside the Pulse WebViews (~360px). The table keeps `minWidth`
 * (default 40rem) so columns retain their natural size.
 *
 * Replaces a bare `<table>` (or one only loosely wrapped) at narrow widths.
 */
export default function ResponsiveTable({ minWidth, className, children, style, ...rest }: ResponsiveTableProps): import("react").JSX.Element;
export {};
