interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    className?: string;
}
export declare function Pagination({ currentPage, totalPages, totalItems, pageSize, onPageChange, className, }: PaginationProps): import("react").JSX.Element | null;
export {};
