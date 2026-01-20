import type { FetchMenuDataResponseType } from '../../types/stores/actions/menu-types.ts';
import type { AsyncThunkAction } from '../../types/stores/types.ts';
import { menuTypes } from '../_constants/menuTypes.ts';

export function fetchMenuData(): AsyncThunkAction {
	const ThunkMiddleWare: AsyncThunkAction = async (dispatch) => {
		try {
			dispatch({
				type: menuTypes.MENU_FETCH,
			});

			const fetchURL: RequestInfo = import.meta.env.VITE_MENU_API;
			const fetchOptions: RequestInit = {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			};

			const response: Response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Menu Data Fetching Failed');

			const data: FetchMenuDataResponseType = await response.json();
			if (data.status !== 'success') throw new Error(`Status Not Successful: ${data.status}`); // prettier-ignore

			dispatch({
				type: menuTypes.MENU_FETCH_SUCCESS,
				payload: data,
			});
		} catch (error) {
			if (error instanceof Error) {
				dispatch({
					type: menuTypes.MENU_FETCH_ERROR,
					payload: error.message,
				});
			}
		}
	};

	return ThunkMiddleWare;
}
