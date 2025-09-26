import type {
	FormFetchCityDataType,
	SetCityNameType,
	SetCountryCodeType,
	SetCountryType,
	SetFetchErrorType,
	SetIsLoadingGeolocationType,
} from '../types/functions/types.ts';

export const getNewCityData = async (
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
