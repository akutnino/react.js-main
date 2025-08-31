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

type CityPositionType = {
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
	id: number;
};
