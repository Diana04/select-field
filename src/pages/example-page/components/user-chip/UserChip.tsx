import { useCallback } from 'react';
import cn from 'clsx';

import CrossIcon from '@assets/circle-cross.svg?react';

import styles from './styles.module.scss';

type Props<Option> = {
    option: Option;
    label: string;
    onClose: (option: Option) => void;
    imgSrc: string;
}

export const UserChip = ({
    option,
    label,
    onClose,
    imgSrc,
}: Props<any>) => {
    const handleClick = useCallback(() => {
        onClose(option);
    }, [onClose, option]);

    return (
        <div className={cn(styles.chip)}>
            <img src={imgSrc} className={cn(styles.img)} />
            {label}
            <CrossIcon className={cn(styles['close-icon'])} onClick={handleClick} />
        </div>
    );
}