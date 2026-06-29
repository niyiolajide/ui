import { type ReactNode } from 'react';
interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    confirmLabel?: string;
    confirmVariant?: 'primary' | 'danger';
    onConfirm?: () => void;
    loading?: boolean;
}
export default function Modal({ open, onClose, title, children, confirmLabel, confirmVariant, onConfirm, loading, }: ModalProps): import("react").JSX.Element | null;
export {};
