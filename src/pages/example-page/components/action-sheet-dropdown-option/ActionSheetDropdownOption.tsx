import cn from 'clsx';

import CheckboxIcon from '@assets/checkbox-list.svg?react';
import ContextIcon from '@assets/context-icon.svg?react';

import styles from './styles.module.scss';

type Props = {
    title: string;
    subtitle: string;
    isSelected?: boolean;
}

export const ActionSheetDropdownOption = ({
    title,
    subtitle,
    isSelected = false,
}: Props) => (
    <div className={cn(styles.option)}>
        <ContextIcon className={cn(styles['context-icon'])} />
        <div className={cn(styles.content)}>
            <div className={cn(styles.title)}>{title}</div>
            <div className={cn(styles.subtitle)}>{subtitle}</div>
        </div>
        {isSelected && <CheckboxIcon className={cn(styles['checkbox-icon'])} />}
    </div>
);