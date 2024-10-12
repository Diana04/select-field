export type SelectOption = any;

export type DropdownOptionProps = {
    option?: SelectOption;
    label: string;
    isSelected?: boolean;
}

export type ChipProps = {
    option: SelectOption;
    label: string;
    onClose: (option: SelectOption) => void;
}

export type DropdownCoords = {
    left?: number;
    top?: number;
    width?: number;
};
