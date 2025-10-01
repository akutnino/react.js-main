// import type { Dispatch } from 'react';
// import type { CityDataType } from '../components/types.ts';
// import type { SetCitiesType } from '../contexts/types.ts';

// export type SetResponseDataType =
// 	| Dispatch<React.SetStateAction<CityDataType | null>>
// 	| Dispatch<React.SetStateAction<CityDataType[]>>;

// export type SetIsLoadingType = Dispatch<React.SetStateAction<boolean>>;

// export type ResponseDataType = CityDataType[] & CityDataType;

// export type SetIsLoadingGeolocationType = Dispatch<React.SetStateAction<boolean>>;

// export type SetFetchErrorType = Dispatch<React.SetStateAction<string>>;

// export type SetCityNameType = Dispatch<React.SetStateAction<string>>;

// export type SetCountryType = Dispatch<React.SetStateAction<string>>;

// export type SetCountryCodeType = Dispatch<React.SetStateAction<string>>;

// export type GetCityDataType = (
// 	urlPath: string,
// 	setIsLoading: SetIsLoadingType,
// 	setResponseData: SetResponseDataType
// ) => Promise<void>;

// export type GetNewCityDataType = (
// 	mapLatitude: string | null,
// 	mapLongitude: string | null,
// 	setIsLoadingGeolocation: SetIsLoadingGeolocationType,
// 	setFetchError: SetFetchErrorType,
// 	setCityName: SetCityNameType,
// 	setCountry: SetCountryType,
// 	setCountryCode: SetCountryCodeType
// ) => Promise<void>;

// export type PostNewCityDataType = (
// 	newCityData: CityDataType,
// 	setIsLoading: SetIsLoadingType,
// 	setCities: SetCitiesType
// ) => Promise<void>;

// export type DeleteCityDataType = (
// 	cityID: string,
// 	setIsLoading: SetIsLoadingType,
// 	setCities: SetCitiesType
// ) => Promise<void>;

// type LocalityInfoType = {
// 	administrative: object[];
// 	informative: object[];
// };

// export type FormFetchCityDataType = {
// 	latitude: number;
// 	lookupSource: string;
// 	longitude: number;
// 	localityLanguageRequested: string;
// 	continent: string;
// 	continentCode: string;
// 	countryName: string;
// 	countryCode: string;
// 	principalSubdivision: string;
// 	principalSubdivisionCode: string;
// 	city: string;
// 	locality: string;
// 	postcode: string;
// 	plusCode: string;
// 	localityInfo: LocalityInfoType;
// };
