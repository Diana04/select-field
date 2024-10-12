import { isNil } from "lodash-es";

import { SelectOption } from "./select-types";

export const filterOptionsBySearchValue = (
    searchValue: string | null,
    options: SelectOption[],
    getLabel: (option: SelectOption) => string,
) => {
    if (!isNil(searchValue)) {
        return options.filter(option => !!getLabel(option).toLowerCase().includes(searchValue.toLowerCase()))
    }

    return options;
}