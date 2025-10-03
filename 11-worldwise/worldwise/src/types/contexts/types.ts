import type { Dispatch } from 'react';
import type { CityDataType } from '../components/types.ts';

export type ResponseDataType = CityDataType[] & CityDataType;

export type GetCityDataType = (urlPath: string) => Promise<void>;

export type GetNewCityDataType = (
	mapLatitude: string | null,
	mapLongitude: string | null,
	setIsLoadingGeolocation: SetIsLoadingGeolocationType,
	setFetchError: SetFetchErrorType,
	setCityName: SetCityNameType,
	setCountry: SetCountryType,
	setCountryCode: SetCountryCodeType
) => Promise<void>;

export type PostNewCityDataType = (newCityData: CityDataType) => Promise<void>;

export type DeleteCityDataType = (cityID: string) => Promise<void>;

export type SetIsLoadingGeolocationType = Dispatch<React.SetStateAction<boolean>>;

export type SetFetchErrorType = Dispatch<React.SetStateAction<string>>;

export type SetCityNameType = Dispatch<React.SetStateAction<string>>;

export type SetCountryType = Dispatch<React.SetStateAction<string>>;

export type SetCountryCodeType = Dispatch<React.SetStateAction<string>>;

type LocalityInfoType = {
	administrative: object[];
	informative: object[];
};

export type FormFetchCityDataType = {
	latitude: number;
	lookupSource: string;
	longitude: number;
	localityLanguageRequested: string;
	continent: string;
	continentCode: string;
	countryName: string;
	countryCode: string;
	principalSubdivision: string;
	principalSubdivisionCode: string;
	city: string;
	locality: string;
	postcode: string;
	plusCode: string;
	localityInfo: LocalityInfoType;
};

export type CitiesContextValue = {
	cities: CityDataType[];
	isLoading: boolean;
	currentCity: CityDataType | null;
	errorMessage: string | null;
	getCityData: GetCityDataType;
	getNewCityData: GetNewCityDataType;
	postNewCityData: PostNewCityDataType;
	deleteCityData: DeleteCityDataType;
};
