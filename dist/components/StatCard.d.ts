import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
interface StatCardProps {
    label: ReactNode;
    value: string | number;
    subtitle?: ReactNode;
    highlight?: boolean;
    highlightTone?: 'success' | 'warning' | 'neutral';
    icon?: LucideIcon;
    trend?: {
        value: number;
        label: string;
    };
    size?: 'default' | 'large';
}
export default function StatCard({ label, value, subtitle, highlight, highlightTone, icon: Icon, trend, size, }: StatCardProps): import("react").JSX.Element;
export {};
