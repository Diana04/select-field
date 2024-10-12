import cn from 'clsx';

import styles from './styles.module.scss';

export const EmptySearchResults = () => (
    <div className={cn(styles.container)}>
        No results
    </div>
);