import cn from 'clsx';

import CheckboxIcon from '@assets/checkbox-list.svg?react';

import styles from './styles.module.scss';

type Props = {
    title: string;
    subtitle: string;
    isSelected?: boolean;
    imgSrc: string;
}

export const UsersDropdownOption = ({
    title,
    subtitle,
    isSelected = false,
    imgSrc,
}: Props) => {
    return (
        <div className={cn(styles['option'])}>
            <img src={imgSrc} className={cn(styles['img'])} />
            <div className={cn(styles['content'])}>
                <div className={cn(styles['title'])}>{title}</div>
                <div className={cn(styles['subtitle'])}>{subtitle}</div>
            </div>
            {isSelected && <CheckboxIcon className={cn(styles['checkbox-icon'])} />}
        </div>
    );
}