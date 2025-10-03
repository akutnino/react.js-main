import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
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
} from '../types/contexts/types.ts';
import {
	WORLDWISE_INITIAL_STATE,
	worldwiseReducer,
} from '../reducers/worldwiseReducer.ts';
import type { WorldwiseInitialStateType } from '../types/reducers/types.ts';

const CitiesContext = createContext<CitiesContextValue | null>(null);

function CitiesProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(worldwiseReducer, WORLDWISE_INITIAL_STATE);
	const { cities, isLoading, currentCity, errorMessage }: WorldwiseInitialStateType =
		state;

	const getCityData = async (urlPath: string) => {
		try {
			dispatch({ type: 'cities/loading' });

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
			if (!responseData.cityName) {
				dispatch({
					type: 'cities/loaded',
					payload: responseData,
				});
			} else {
				dispatch({
					type: 'city/loaded',
					payload: responseData,
				});
			}
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: 'cities/rejected',
					payload: error.message,
				});
			}
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
			dispatch({ type: 'cities/loading' });

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

			dispatch({
				type: 'city/created',
				payload: data,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: 'cities/rejected',
					payload: error.message,
				});
			}
		}
	};

	const deleteCityData = async (cityID: string) => {
		try {
			dispatch({ type: 'cities/loading' });

			const fetchURL: RequestInfo | URL = `http://localhost:8000/cities/${cityID}`;
			const fetchOptions: RequestInit = {
				method: 'DELETE',
			};

			const response: Response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Failed Fetch Request');

			dispatch({
				type: 'city/deleted',
				payload: cityID,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: 'cities/rejected',
					payload: error.message,
				});
			}
		}
	};

	useEffect(() => {
		getCityData('cities');
		return () => {};
	}, []);

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				errorMessage,
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
