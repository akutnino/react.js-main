import type { MenuReducerActionType } from '../../types/stores/actions/menu-types.ts';
import type { MenuInitialStateType } from '../../types/stores/reducers/menu-types.ts';
import { menuTypes } from '../_constants/menuTypes.ts';

const MENU_INITIAL_STATE: MenuInitialStateType = {
	menu: null,
	isLoading: false,
	errorMessage: null,
};

function menuReducer(
	currentState = MENU_INITIAL_STATE,
	action: MenuReducerActionType
): MenuInitialStateType {
	switch (action.type) {
		case menuTypes.MENU_FETCH: {
			return {
				...currentState,
				isLoading: true,
				errorMessage: null,
			};
		}
		case menuTypes.MENU_FETCH_SUCCESS: {
			return {
				...currentState,
				menu: action.payload.data,
				isLoading: false,
			};
		}
		case menuTypes.MENU_FETCH_ERROR: {
			return {
				...currentState,
				errorMessage: action.payload,
				isLoading: false,
			};
		}
		default: {
			return currentState;
		}
	}
}

export { menuReducer, MENU_INITIAL_STATE };
