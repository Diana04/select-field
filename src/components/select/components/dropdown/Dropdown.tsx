import { useCallback, forwardRef } from 'react';
import { createPortal } from 'react-dom'
import cn from 'clsx';

import type { SelectOption, DropdownOptionProps, DropdownCoords } from '../../select-types';
import { EmptySearchResults } from '../empty-search-results';
import { DropdownOption } from '../dropdown-option';
import styles from './styles.module.scss';

type Props = {
    dropdownCoords: DropdownCoords;
    options: SelectOption[];
    label?: string;
    getLabel: (opion: SelectOption) => string;
    dropdownOptionRender?: (props: DropdownOptionProps) => React.ReactElement;
    onSelect: (option: SelectOption) => void;
    getIsSelected: (option: SelectOption) => boolean;
    emptySearchResultsComponent?: React.FC<any>;
}

export const Dropdown = forwardRef<HTMLDivElement, Props>((
    {
        dropdownCoords,
        options,
        getLabel,
        dropdownOptionRender,
        onSelect,
        getIsSelected,
        emptySearchResultsComponent: EmptySearchResultsComponent = EmptySearchResults,
    },
    ref
) => {
    const DropdownOptionComponent = useCallback((props: DropdownOptionProps) => (
        dropdownOptionRender
            ? dropdownOptionRender(props)
            : <DropdownOption {...props} />
    ), [dropdownOptionRender]);

    return createPortal(
        <div ref={ref}>
            <ul
                className={cn(styles.dropdown)}
                style={dropdownCoords}
            >
                {options.map((option, index) => (
                    <li
                        className={cn(styles['dropdown-option'])}
                        onClick={() => onSelect(option)}
                        key={index}
                    >
                        <DropdownOptionComponent
                            option={option}
                            label={getLabel(option)}
                            isSelected={getIsSelected(option)}
                        />
                    </li>
                ))}

                {options.length === 0 && <EmptySearchResultsComponent />}
            </ul>
        </div>,
        document.body
    )
});
