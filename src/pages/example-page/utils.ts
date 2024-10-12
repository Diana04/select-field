import { User } from "./types";

export const getSelectValue = (option: User) => `${option?.name?.first}-${option?.name?.last}`;
export const getSelectLabel = (option: User) => `${option?.name?.first} ${option?.name?.last}`;
export const getDropdownOptionTitle = (option: User) => `${option?.name?.first} ${option?.name?.last}`;
