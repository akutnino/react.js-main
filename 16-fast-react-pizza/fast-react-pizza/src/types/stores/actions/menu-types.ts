import type { MenuDataType } from '../reducers/types.ts';

export type FetchDataResponseType = {
	status: string;
	data: MenuDataType;
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
