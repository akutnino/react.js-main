import type { MenuDataArrayType } from '../reducers/menu-types.ts';
import { menuTypes } from '../../../stores/_constants/menuTypes.ts';

export type FetchMenuDataResponseType = {
	status: 'success' | 'fail';
	data: MenuDataArrayType;
};

export type MenuFetchStartActionType = {
	type: typeof menuTypes.MENU_FETCH;
};
export type MenuFetchSuccessActionType = {
	type: typeof menuTypes.MENU_FETCH_SUCCESS;
	payload: FetchMenuDataResponseType;
};

export type MenuFetchErrorActionType = {
	type: typeof menuTypes.MENU_FETCH_ERROR;
	payload: string;
};

export type MenuReducerActionType =
	| MenuFetchStartActionType
	| MenuFetchSuccessActionType
	| MenuFetchErrorActionType;
