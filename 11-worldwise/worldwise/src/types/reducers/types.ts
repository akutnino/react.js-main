import type { CityDataType } from '../components/types.ts';

type WorldwiseCitiesLoadingActionType = {
	type: 'cities/loading';
};

type WorldwiseCitiesLoadedActionType = {
	type: 'cities/loaded';
	payload: CityDataType[];
};

type WorldwiseCitiesCreatedActionType = {
	type: 'cities/created';
	payload: CityDataType;
};

type WorldwiseCitiesDeletedActionType = {
	type: 'cities/deleted';
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
