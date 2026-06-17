interface PageErrorStateProps {
    message: string;
    onRetry?: () => void;
    retryLabel?: string;
    className?: string;
}
interface PageEmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
    className?: string;
}
export declare function PageErrorState({ message, onRetry, retryLabel, className, }: PageErrorStateProps): import("react").JSX.Element;
export declare function PageEmptyState({ title, description, actionLabel, actionHref, className, }: PageEmptyStateProps): import("react").JSX.Element;
export {};
