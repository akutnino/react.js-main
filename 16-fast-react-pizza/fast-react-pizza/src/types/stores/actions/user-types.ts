import type { userTypes } from '../../../stores/_constants/userTypes.ts';
import type { UserPositionStateType } from '../reducers/user-types.ts';

export type UserAddressObjectType = {
	position: UserPositionStateType;
	address: string;
};

export type UserFetchAddressResponseType = {
	city: string;
	continent: string;
	continentCode: string;
	countryCode: string;
	countryName: string;
	latitude: number;
	locality: string;
	localityInfo: { administrative: unknown[]; informative: unknown[] };
	localityLanguageRequested: string;
	longitude: number;
	lookupSource: string;
	plusCode: string;
	postcode: string;
	principalSubdivision: string;
	principalSubdivisionCode: string;
};

export type UserUpdateUsernameActionType = {
	type: typeof userTypes.USER_UPDATE_USERNAME;
	payload: string;
};

export type UserFetchAddressStartActionType = {
	type: typeof userTypes.USER_FETCH_ADDRESS;
};

export type UserFetchAddressSuccessActionType = {
	type: typeof userTypes.USER_FETCH_ADDRESS_SUCCESS;
	payload: UserAddressObjectType;
};

export type UserFetchAddressErrorActionType = {
	type: typeof userTypes.USER_FETCH_ADDRESS_ERROR;
	payload: string;
};

export type UserReducerActionType =
	| UserUpdateUsernameActionType
	| UserFetchAddressStartActionType
	| UserFetchAddressSuccessActionType
	| UserFetchAddressErrorActionType;
