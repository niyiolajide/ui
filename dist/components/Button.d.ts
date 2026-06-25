import { ButtonHTMLAttributes } from 'react';
import { type LucideIcon } from 'lucide-react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'neutral';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    loading?: boolean;
    /** Replaces the label while `loading` — give it context ("Saving…", "Pulling transactions…"). */
    loadingLabel?: string;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
}
export default function Button({ variant, size, loading, loadingLabel, leftIcon: LeftIcon, rightIcon: RightIcon, className, children, disabled, ...props }: ButtonProps): import("react").JSX.Element;
export {};
