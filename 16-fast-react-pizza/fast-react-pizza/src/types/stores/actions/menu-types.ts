import type { MenuDataArrayType } from '../reducers/types.ts';

export type FetchDataResponseType = {
	status: string;
	data: MenuDataArrayType;
};

export type MenuFetchStartActionType = {
	type: 'menu/fetchStart';
};
export type MenuFetchSuccessActionType = {
	type: 'menu/fetchSuccess';
	payload: FetchDataResponseType;
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
