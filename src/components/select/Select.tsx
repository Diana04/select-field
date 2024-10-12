import { useCallback, useState, useRef, useMemo } from 'react';
import omit from 'lodash-es/omit';
import isEmpty from 'lodash-es/isEmpty';
import isNil from 'lodash-es/isNil';
import cn from 'clsx';

import ChevronIcon from '@assets/chevron-up.svg?react';
import { useOutsideClick } from '@hooks';

import { SelectChip, EmptySearchResults, Dropdown } from './components';
import { filterOptionsBySearchValue } from './utils';
import type { SelectOption, DropdownOptionProps, ChipProps } from './select-types';
import styles from './styles.module.scss';
import { useDropdownCoords } from './hooks';

type Props = {
    options: SelectOption[];
    placeholder?: string;
    label?: string;
    hint?: string;
    isMultiple?: boolean;
    getValue: (option: SelectOption) => string;
    getLabel: (opion: SelectOption) => string;
    dropdownOptionRender?: (props: DropdownOptionProps) => React.ReactElement;
    chipRender?: (props: ChipProps) => React.ReactElement;
    onSearch?: (value: string) => void;
    onSelect?: (options: SelectOption[]) => void;
    emptySearchResultsComponent?: React.FC<any>;
}

export const Select = ({
    options,
    placeholder = '',
    label,
    hint,
    isMultiple = false,
    getValue,
    getLabel,
    emptySearchResultsComponent: EmptySearchResultsComponent = EmptySearchResults,
    dropdownOptionRender,
    chipRender,
    onSearch = () => {},
    onSelect = () => {},
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [searchValue, setSearchValue] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownCoords = useDropdownCoords(inputContainerRef);

    const [selectedValues, setSelectedValues] = useState<Record<string, SelectOption>>({});
    const [isFocused, setIsFocused] = useState(false);
    
    const dropdownOptions = useMemo(
        () => filterOptionsBySearchValue(searchValue, options, getLabel),
        [selectedValues, searchValue, options, getLabel]
    );

    useOutsideClick([inputContainerRef, dropdownRef], () => {
        setIsFocused(false);
        setIsDropdownOpen(false);
        setSearchValue(null);
    });

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        onSearch(value);
        setSearchValue(value);
    }, [setSearchValue, onSearch]);

    const handleSelect = useCallback((option: object) => {
        const value = getValue(option);
        const hasValueBeenSelected = !!selectedValues[value];

        let result = {};

        if (isMultiple) {
            result = hasValueBeenSelected
                ? omit(selectedValues, value)
                : {...selectedValues, [value]: option};
        } else {
            result = hasValueBeenSelected
                ? {}
                : {[value]: option};

            setIsDropdownOpen(false);
        }

        setSearchValue(null);
        onSelect(Object.values(result));
        setSelectedValues(result);
    }, [selectedValues, setSelectedValues, setSearchValue, getValue, setIsDropdownOpen, isMultiple]);

    const toogleDropdown = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    }, [setIsDropdownOpen, isDropdownOpen]);

    const handleFocus = useCallback(() => {
        setIsDropdownOpen(true);

        if (inputRef?.current) {
            inputRef.current?.focus();
            setIsFocused(true);
        }
    }, [setIsDropdownOpen]);

    const inputValue = useMemo(() => {
        return isNil(searchValue) && !isMultiple && !isEmpty(selectedValues)
            ? getLabel(Object.values(selectedValues)[0])
            : searchValue
    }, [isMultiple, searchValue, selectedValues, getLabel]);

    const ChipComponent = useCallback((props: any) => (
        chipRender
            ? chipRender(props)
            : <SelectChip {...props} />
    ), [chipRender]);

    return (
        <div>
            {label && <div className={cn(styles.label)}>
                {label}
            </div>}

            <div
                ref={inputContainerRef}
                className={cn(styles['input-container'], {
                    [styles['input-container--focused']]: isFocused
                })}
                onClick={handleFocus}
            >
                <div className={cn(styles['input-content'])}>
                    {isMultiple && !isEmpty(selectedValues) &&
                        Object.values(selectedValues).map((option, index) => (
                            <div className={cn(styles['input-content__item'])} key={index}>
                                <ChipComponent
                                    option={option}
                                    label={getLabel(option)}
                                    onClose={handleSelect}
                                />
                            </div>
                        ))
                    }
                    <input
                        value={inputValue || ''}
                        onChange={handleSearch}
                        placeholder={isEmpty(selectedValues) ? placeholder : ''}
                        className={cn(styles.input, styles['input-content__item'])}
                        ref={inputRef}
                    />
                </div>
                {!isMultiple && <ChevronIcon
                    onClick={toogleDropdown}
                    className={cn(styles['arrow-icon'], {
                        [styles['arrow-icon--opened']]: isDropdownOpen}
                    )}
                />}
            </div>

            {hint && <div className={cn(styles.hint)}>
                {hint}
            </div>}

            {isDropdownOpen && <Dropdown
                ref={dropdownRef}
                dropdownCoords={dropdownCoords}
                options={dropdownOptions}
                getLabel={getLabel}
                dropdownOptionRender={dropdownOptionRender}
                onSelect={handleSelect}
                getIsSelected={option => !!selectedValues[getValue(option)]}
                emptySearchResultsComponent={EmptySearchResultsComponent}
            />}
        </div>
    );
}