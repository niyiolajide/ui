import { type ReactNode } from 'react';
type ToastType = 'success' | 'error' | 'info';
interface ToastAction {
    label: string;
    onClick: () => void;
}
interface ToastOptions {
    /** ms before auto-dismiss; pass 0 to keep until dismissed. Default 4000. */
    duration?: number;
    /** Optional inline action, e.g. an Undo or "View →". */
    action?: ToastAction;
}
interface ToastApi {
    toast: (message: string, opts?: ToastOptions & {
        type?: ToastType;
    }) => void;
    success: (message: string, opts?: ToastOptions) => void;
    error: (message: string, opts?: ToastOptions) => void;
    info: (message: string, opts?: ToastOptions) => void;
    dismiss: (id: number) => void;
}
export declare function ToastProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useToast(): ToastApi;
export {};
