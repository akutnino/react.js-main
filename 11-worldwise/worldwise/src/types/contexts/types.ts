import type { Dispatch } from 'react';
import type { CityDataType } from '../components/types.ts';

export type CitiesContextValue = {
	cities: CityDataType[];
	isLoading: boolean;
	setIsLoading: Dispatch<React.SetStateAction<boolean>>;
	currentCity: CityDataType | null;
	setCurrentCity: Dispatch<React.SetStateAction<CityDataType | null>>;
};
