import { useAsync } from 'react-use';
import cn from 'clsx';

import { Select } from '@components';

import { ComboboxEmptySearchResults, ActionSheetDropdownOption, UsersDropdownOption, UserChip } from './components';
import { User } from './types';
import { getDropdownOptionTitle, getSelectLabel, getSelectValue } from './utils';
import styles from './styles.module.scss';

// mocked data
const fetchMockUsers = async (): Promise<User[]> => {
    const response = await fetch('https://randomuser.me/api/?results=20')
    const data = await response.json();

    return data.results;
}

export const ExamplePage = () => {
    const {value: users, loading: isLoading} = useAsync(async () => {
        return await fetchMockUsers();
    });

    if (isLoading) {
        return <div className={cn(styles.container)}>Loading...</div>
    }

    if (!users?.length) {
        return <div className={cn(styles.container)}>No users...</div>;
    }

    return (
        <div className={cn(styles.container)}>
            <div className={cn(styles.item)}>
                <div className={cn(styles['item-title'])}>Select</div>
                <div className={cn(styles['item-description'])}>
                    Select - это вид текстового поля, который предоставляет пользователям опцию
                    выбора одного или нескольких элементов из выпадающего списка. Этот элемент обычно используется
                    в формах или для встроенного редактирования.
                </div>
                <Select
                    getValue={getSelectValue}
                    getLabel={getSelectLabel}
                    options={users}
                    placeholder='Placeholder'
                    label='Title'
                    hint='Hint'
                />
            </div>

            <div className={cn(styles.item)}>
                <div className={cn(styles['item-title'])}>Action sheet</div>
                <div className={cn(styles['item-description'])}>
                    Action sheet - это элемент, который появляется после нажатия на кнопку или иконку.
                    Этот элемент предоставляет пользователю выбор из нескольких действий или опций, которые связаны
                    c текущим контекстом или задачей.
                </div>
                <Select
                    getValue={getSelectValue}
                    getLabel={getSelectLabel}
                    options={users}
                    placeholder='Placeholder'
                    label='Title'
                    hint='Hint'
                    dropdownOptionRender={({option, isSelected}) => (<ActionSheetDropdownOption
                        title={getDropdownOptionTitle(option)}
                        subtitle='Subtitle'
                        isSelected={isSelected}
                    />)}
                />
            </div>

            <div className={cn(styles.item, styles['item--multiselect'])}>
                <div className={cn(styles['item-title'])}>Multi select</div>
                <div className={cn(styles['item-description'])}>
                    "Multi Select" (Множественный выбор) - это интерактивный элемент пользовательского интерфейса,
                    предназначенный для выбора нескольких элементов из списка доступных опций или вариантов.
                    Этот компонент обеспечивает пользователям возможность выбирать одновременно более одного
                    элемента из предложенных вариантов. Также есть возможность поиска.
                </div>
                <Select
                    getValue={getSelectValue}
                    getLabel={getSelectLabel}
                    options={users}
                    placeholder='Placeholder'
                    label='Title'
                    hint='Hint'
                    isMultiple
                    chipRender={({option, label, onClose}) => (<UserChip
                        option={option}
                        label={label}
                        onClose={onClose}
                        imgSrc={option?.picture.thumbnail}
                    />)}
                    dropdownOptionRender={({option, isSelected}) => (<UsersDropdownOption
                        title={getDropdownOptionTitle(option)}
                        subtitle={option?.email}
                        isSelected={isSelected}
                        imgSrc={option?.picture.thumbnail}
                    />)}
                />
            </div>

            <div className={cn(styles.item)}>
                <div className={cn(styles['item-title'])}>Combobox</div>
                <div className={cn(styles['item-description'])}>
                    Combobox - это вид текстового поля, который предоставляет пользователям опцию выбора
                    одного или нескольких элементов из выпадающего списка и добавления новых элементов в список.
                    Этот элемент обычно используется в формах или для встроенного редактирования.
                </div>
                <Select
                    getValue={getSelectValue}
                    getLabel={getSelectLabel}
                    options={users}
                    placeholder='Placeholder'
                    label='Title'
                    hint='Hint'
                    emptySearchResultsComponent={() => (
                        <ComboboxEmptySearchResults onClick={() => console.log('Add new category')}/>
                    )}
                    isMultiple
                />
            </div>
        </div>
    );
}
