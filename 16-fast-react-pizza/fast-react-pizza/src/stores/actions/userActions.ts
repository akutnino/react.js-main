import type {
	ErrorCallbackType,
	UserAddressObjectType,
	UserFetchAddressResponseType,
	UserUpdateUsernameActionType,
} from '../../types/stores/actions/user-types.ts';
import type { UserPositionStateType } from '../../types/stores/reducers/user-types.ts';
import type { AsyncThunkAction } from '../../types/stores/types.ts';
import { userTypes } from '../_constants/userTypes.ts';

export function updatedUsername(newUsername: string): UserUpdateUsernameActionType {
	return {
		type: userTypes.USER_UPDATE_USERNAME,
		payload: newUsername,
	};
}

export function fetchUserAddress(): AsyncThunkAction {
	const ThunkMiddleware: AsyncThunkAction = async (dispatch, getState) => {
		try {
			dispatch({ type: userTypes.USER_FETCH_ADDRESS });

			const errorCallback: ErrorCallbackType = () => {
				dispatch({
					type: userTypes.USER_FETCH_ADDRESS_ERROR,
					payload: 'Hardware Device Location Access Denied',
				});
			};

			const userGeolocationPosition: GeolocationPosition = await new Promise((resolve) =>
				navigator.geolocation.getCurrentPosition(resolve, errorCallback)
			);

			const userPosition: UserPositionStateType = {
				latitude: `${userGeolocationPosition.coords.latitude}`,
				longitude: `${userGeolocationPosition.coords.longitude}`,
			};

			const FETCH_PARAMS: string = `latitude=${userPosition.latitude}&longitude=${userPosition.longitude}`;
			const fetchURL: RequestInfo = `${import.meta.env.VITE_LOCATION_API}${FETCH_PARAMS}`;
			const fetchOptions: RequestInit = {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			};

			const response: Response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Fetching User Address Failed');

			const data: UserFetchAddressResponseType = await response.json();
			if (!data.countryName) throw new Error('Invalid Response: Country Name Not Found');

			const userAddressObject: UserAddressObjectType = {
				position: userPosition,
				address: `${data.locality}, ${data.city} ${data.postcode}, ${data.countryName}`,
			};

			dispatch({
				type: userTypes.USER_FETCH_ADDRESS_SUCCESS,
				payload: userAddressObject,
			});

			return getState().user.address;
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: userTypes.USER_FETCH_ADDRESS_ERROR,
					payload: error.message,
				});
			}
		}
	};

	return ThunkMiddleware;
}
