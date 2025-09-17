import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchData } from '../functions/fetchData.ts';
import type { CityDataType } from '../types/components/types.ts';
import type { CitiesContextValue } from '../types/contexts/types.ts';

const CitiesContext = createContext<CitiesContextValue | null>(null);

function CitiesProvider({ children }: { children: ReactNode }) {
	const [cities, setCities] = useState<CityDataType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentCity, setCurrentCity] = useState<CityDataType | null>(null);

	useEffect(() => {
		fetchData('cities', setIsLoading, setCities);
		return () => {};
	}, []);

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				setIsLoading,
				currentCity,
				setCurrentCity,
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
