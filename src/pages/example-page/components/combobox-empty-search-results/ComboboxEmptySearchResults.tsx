import cn from 'clsx';
import PlusIcon from '@assets/plus.svg?react';

import styles from './styles.module.scss';

type Props = {
    onClick: () => void;
}

export const ComboboxEmptySearchResults = ({
    onClick
}: Props) => {
    return (
        <div
            onClick={onClick}
            className={cn(styles.container)}
        >
            <PlusIcon className={cn(styles['plus-icon'])} />
            Создать «Новая категория»
        </div>
    );
}