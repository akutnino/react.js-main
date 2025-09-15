import type { CityDataType } from '../components/types.ts';

export type CitiesContextValue = {
	cities: CityDataType[];
	isLoading: boolean;
};
