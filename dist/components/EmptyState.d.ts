import { type LucideIcon } from 'lucide-react';
interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
}
export default function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps): import("react").JSX.Element;
export {};
