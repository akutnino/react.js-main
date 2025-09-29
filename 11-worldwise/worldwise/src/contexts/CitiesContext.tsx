import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getCityData as getCityDataFunc } from '../functions/getCityData.ts';
import { getNewCityData as getNewCityDataFunc } from '../functions/getNewCityData.ts';
import { postNewCityData as postNewCityDataFunc } from '../functions/postNewCityData.ts';
import { deleteCityData as deleteCityDataFunc } from '../functions/deleteCityData.ts';
import type { CityDataType } from '../types/components/types.ts';
import type { CitiesContextValue } from '../types/contexts/types.ts';
import type {
	DeleteCityDataType,
	GetCityDataType,
	GetNewCityDataType,
	PostNewCityDataType,
} from '../types/functions/types.ts';

const CitiesContext = createContext<CitiesContextValue | null>(null);

function CitiesProvider({ children }: { children: ReactNode }) {
	const [cities, setCities] = useState<CityDataType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentCity, setCurrentCity] = useState<CityDataType | null>(null);
	const getCityData: GetCityDataType = getCityDataFunc;
	const getNewCityData: GetNewCityDataType = getNewCityDataFunc;
	const postNewCityData: PostNewCityDataType = postNewCityDataFunc;
	const deleteCityData: DeleteCityDataType = deleteCityDataFunc;

	useEffect(() => {
		getCityData('cities', setIsLoading, setCities);
		return () => {};
	}, [getCityData]);

	return (
		<CitiesContext.Provider
			value={{
				cities,
				setCities,
				isLoading,
				setIsLoading,
				currentCity,
				setCurrentCity,
				getCityData,
				getNewCityData,
				postNewCityData,
				deleteCityData,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext<CitiesContextValue | null>(CitiesContext);

	if (context === null) throw new Error('CitiesContext cannot be null.');
	if (context === undefined) throw new Error('Outside of CitiesContext Scope.');
	return context;
}

export { CitiesProvider, useCities };
