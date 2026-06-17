interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    title?: string;
    hoverable?: boolean;
    variant?: 'default' | 'compact' | 'outlined' | 'tinted' | 'elevated' | 'interactive';
    className?: string;
}
export default function Card({ children, title, hoverable, variant, className, ...rest }: CardProps): import("react").JSX.Element;
export {};
