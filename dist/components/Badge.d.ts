interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'neutral' | 'info';
    size?: 'sm' | 'md';
    className?: string;
}
export default function Badge({ children, variant, size, className }: BadgeProps): import("react").JSX.Element;
export {};
