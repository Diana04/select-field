import cn from 'clsx';

import CheckboxIcon from '@assets/checkbox-list.svg?react';

import { DropdownOptionProps } from '../../select-types';
import styles from './styles.module.scss';

export const DropdownOption = ({
    label,
    isSelected = false,
}: DropdownOptionProps) => (
    <div className={cn(styles.option)}>
        {label}
        {isSelected && <CheckboxIcon className={cn(styles['checkbox-icon'])}/>}
    </div>
);