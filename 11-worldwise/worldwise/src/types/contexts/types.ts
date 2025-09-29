import type { Dispatch } from 'react';
import type { CityDataType } from '../components/types.ts';
import type {
	DeleteCityDataType,
	GetCityDataType,
	GetNewCityDataType,
	PostNewCityDataType,
} from '../functions/types.ts';

export type SetCitiesType = Dispatch<React.SetStateAction<CityDataType[]>>;

export type CitiesContextValue = {
	cities: CityDataType[];
	setCities: SetCitiesType;
	isLoading: boolean;
	setIsLoading: Dispatch<React.SetStateAction<boolean>>;
	currentCity: CityDataType | null;
	setCurrentCity: Dispatch<React.SetStateAction<CityDataType | null>>;
	getCityData: GetCityDataType;
	getNewCityData: GetNewCityDataType;
	postNewCityData: PostNewCityDataType;
	deleteCityData: DeleteCityDataType;
};
