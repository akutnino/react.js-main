import type { CityDataType, UserType } from '../components/types.ts';

type WorldwiseCitiesLoadingActionType = {
	type: 'cities/loading';
};

type WorldwiseCitiesLoadedActionType = {
	type: 'cities/loaded';
	payload: CityDataType[];
};

type WorldwiseCitiesCreatedActionType = {
	type: 'city/created';
	payload: CityDataType;
};

type WorldwiseCitiesDeletedActionType = {
	type: 'city/deleted';
	payload: string;
};

type WorldwiseCitiesRejectedActionType = {
	type: 'cities/rejected';
	payload: string;
};

type WorldwiseCityLoadedActionType = {
	type: 'city/loaded';
	payload: CityDataType | null;
};

export type WorldwiseActionType =
	| WorldwiseCitiesLoadingActionType
	| WorldwiseCitiesLoadedActionType
	| WorldwiseCitiesCreatedActionType
	| WorldwiseCitiesDeletedActionType
	| WorldwiseCitiesRejectedActionType
	| WorldwiseCityLoadedActionType;

export type WorldwiseInitialStateType = {
	cities: CityDataType[];
	isLoading: boolean;
	currentCity: CityDataType | null;
	errorMessage: null | string;
};

type AuthUserLoginType = {
	type: 'user/login';
	payload: UserType;
};

type AuthUserLogoutType = {
	type: 'user/logout';
};

export type AuthActionType = AuthUserLoginType | AuthUserLogoutType;

export type AuthInitialStateType = {
	user: UserType | null;
	isAuthenticated: boolean;
};
