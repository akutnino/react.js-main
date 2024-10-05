import { fetchAddress } from '../reducers/userSlice';

export function inputUserName(userName) {
	return { type: 'user/inputUserName', payload: userName };
}

export function fetchUserAddress() {
	return async (dispatch) => {
		try {
			dispatch({ type: 'user/fetchingAddress' });

			const { position, address } = await fetchAddress();

			dispatch({ type: 'user/fetchAddress', payload: { position, address } });
		} catch (error) {
			dispatch({ type: 'user/fetchAddressError', payload: error.message });
		}
	};
}
