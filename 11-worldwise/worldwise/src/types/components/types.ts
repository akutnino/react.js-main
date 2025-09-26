import type { SetURLSearchParams } from 'react-router';

export type UserType = {
	name: string;
	email: string;
	password: string;
	avatar: string;
};

export type CurrentCityType = {
	cityName: string;
	emoji: string;
	date: string;
	notes: string;
};

export type CityPositionType = {
	lat: number;
	lng: number;
};

export type CityDataType = {
	cityName: string;
	country: string;
	emoji: string;
	date: string;
	notes: string;
	position: CityPositionType;
	id?: number;
};

export type UseSearchParamsType = [URLSearchParams, SetURLSearchParams];
