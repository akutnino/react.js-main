import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { CityDataType } from '../types/components/types.ts';
import type { CitiesContextValue } from '../types/contexts/types.ts';

const CitiesContext = createContext<CitiesContextValue | null>(null);

function CitiesProvider({ children }: { children: ReactNode }) {
	const [cities, setCities] = useState<CityDataType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchCitiesData = async () => {
			try {
				setIsLoading(true);

				const fetchURL: string = 'http://localhost:8000/cities';
				const fetchOptions: RequestInit = {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				};

				const response: Response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('Failed Fetch Request');

				const data: CityDataType[] = await response.json();
				setCities(data);
			} catch (error) {
				if (error instanceof Error) {
					console.log(error.message);
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchCitiesData();
		return () => {};
	}, []);

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
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
