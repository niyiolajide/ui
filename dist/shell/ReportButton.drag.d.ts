export interface Point {
    x: number;
    y: number;
}
/**
 * Pointer-drag for the floating Report panel. The handle element gets the
 * returned handlers; pointer capture keeps move/up events flowing to it even
 * when the cursor leaves the handle. `pos` is null until first positioned (the
 * panel then places itself, e.g. top-right) so we don't need window size on SSR.
 */
export declare function useDrag(): {
    pos: Point | null;
    dragHandlers: {
        onPointerDown: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerMove: (event: React.PointerEvent<HTMLElement>) => void;
        onPointerUp: (event: React.PointerEvent<HTMLElement>) => void;
    };
};
