import { InputHTMLAttributes } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    variant?: 'default' | 'subtle';
    density?: 'default' | 'compact';
}
export default function Input({ label, error, helperText, variant, density, className, id, type, 'aria-describedby': externalDescribedBy, ...props }: InputProps): import("react").JSX.Element;
export {};
