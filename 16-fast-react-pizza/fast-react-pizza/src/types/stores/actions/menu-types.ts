import type { MenuDataArrayType } from '../reducers/menu-types.ts';

export type FetchMenuDataResponseType = {
	status: 'success' | 'fail';
	data: MenuDataArrayType;
};

export type MenuFetchStartActionType = {
	type: 'menu/fetchStart';
};
export type MenuFetchSuccessActionType = {
	type: 'menu/fetchSuccess';
	payload: FetchMenuDataResponseType;
};

export type MenuFetchErrorActionType = {
	type: 'menu/fetchError';
	payload: string;
};

export type MenuFetchEndActionType = {
	type: 'menu/fetchEnd';
};

export type MenuReducerActionType =
	| MenuFetchStartActionType
	| MenuFetchSuccessActionType
	| MenuFetchErrorActionType
	| MenuFetchEndActionType;
