import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { CityDataType } from '../types/components/types.ts';
import type {
	CitiesContextValue,
	FormFetchCityDataType,
	ResponseDataType,
	SetCityNameType,
	SetCountryCodeType,
	SetCountryType,
	SetFetchErrorType,
	SetIsLoadingGeolocationType,
	SetResponseDataType,
} from '../types/contexts/types.ts';

const CitiesContext = createContext<CitiesContextValue | null>(null);

function CitiesProvider({ children }: { children: ReactNode }) {
	const [cities, setCities] = useState<CityDataType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentCity, setCurrentCity] = useState<CityDataType | null>(null);

	const getCityData = async (urlPath: string, setResponseData: SetResponseDataType) => {
		try {
			setIsLoading(true);

			const fetchURL: string = `http://localhost:8000/${urlPath}`;
			const fetchOptions: RequestInit = {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			};

			const response: Response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Failed Fetch Request');

			const responseData: ResponseDataType = await response.json();
			setResponseData(responseData);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const getNewCityData = async (
		mapLatitude: string | null,
		mapLongitude: string | null,
		setIsLoadingGeolocation: SetIsLoadingGeolocationType,
		setFetchError: SetFetchErrorType,
		setCityName: SetCityNameType,
		setCountry: SetCountryType,
		setCountryCode: SetCountryCodeType
	) => {
		try {
			setIsLoadingGeolocation(true);
			setFetchError('');

			const fetchURL:
				| RequestInfo
				| URL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapLatitude}&longitude=${mapLongitude}`;

			const fetchOptions: RequestInit = {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			};

			const response: Response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Failed Fetch Request');

			const data: FormFetchCityDataType = await response.json();
			if (!data.countryCode) throw new Error('Not a Country.Pls Click Somewhere else.');

			setCityName(data.city || data.locality || '');
			setCountry(data.countryName);
			setCountryCode(data.countryCode);
		} catch (error) {
			if (error instanceof Error) {
				setFetchError(error.message);
			}
		} finally {
			setIsLoadingGeolocation(false);
		}
	};

	const postNewCityData = async (newCityData: CityDataType) => {
		try {
			setIsLoading(true);

			const fetchURL: RequestInfo | URL = `http://localhost:8000/cities`;
			const fetchOptions: RequestInit = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newCityData),
			};

			const response: Response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Failed Fetch Request');

			const data: CityDataType = await response.json();
			if (!data.id) throw new Error('API Post Request Failed');

			setCities((currentState) => [...currentState, data]);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const deleteCityData = async (cityID: string) => {
		try {
			setIsLoading(true);

			const fetchURL: RequestInfo | URL = `http://localhost:8000/cities/${cityID}`;
			const fetchOptions: RequestInit = {
				method: 'DELETE',
			};

			const response: Response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Failed Fetch Request');

			setCities((currentCities) => currentCities.filter((city) => city.id !== cityID));
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getCityData('cities', setCities);
		return () => {};
	}, []);

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
