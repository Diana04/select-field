import { useCallback } from 'react';
import cn from 'clsx';

import CrossIcon from '@assets/circle-cross.svg?react';

import type { SelectOption as TSelectOption } from '../../select-types';
import styles from './styles.module.scss';

type Props<Option> = {
    option: Option;
    label: string;
    onClose: (option: Option) => void;
}

export const SelectChip = ({
    option,
    label,
    onClose,
}: Props<TSelectOption>) => {
    const handleClick = useCallback(() => {
        onClose(option);
    }, [onClose, option]);

    return (
        <div className={cn(styles.chip)}>
            {label}
            <CrossIcon className={cn(styles['close-icon'])} onClick={handleClick} />
        </div>
    );
}