import cn from 'clsx';

import { ExamplePage } from './pages';
import styles from './styles.module.scss';

function App() {
    return (
        <div className={cn(styles.container)}>
            <ExamplePage />
        </div>
    )
}

export default App
