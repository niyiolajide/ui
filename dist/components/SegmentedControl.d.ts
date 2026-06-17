interface SegmentedControlOption<T extends string> {
    value: T;
    label: string;
    icon?: React.ReactNode;
}
interface SegmentedControlProps<T extends string> {
    options: SegmentedControlOption<T>[];
    value: T;
    onChange: (value: T) => void;
    ariaLabel: string;
    size?: 'sm' | 'md';
    className?: string;
}
export declare function SegmentedControl<T extends string>({ options, value, onChange, ariaLabel, size, className, }: SegmentedControlProps<T>): import("react").JSX.Element;
export {};
