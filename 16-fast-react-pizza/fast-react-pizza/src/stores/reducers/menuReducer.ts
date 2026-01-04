import type { MenuReducerActionType } from '../../types/stores/actions/menu-types.ts';
import type { MenuInitialStateType } from '../../types/stores/reducers/menu-types.ts';

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
		case 'menu/fetchStart': {
			return {
				...currentState,
				isLoading: true,
				errorMessage: null,
			};
		}
		case 'menu/fetchSuccess': {
			return {
				...currentState,
				menu: action.payload.data,
				isLoading: false,
			};
		}
		case 'menu/fetchError': {
			return {
				...currentState,
				errorMessage: action.payload,
				isLoading: false,
			};
		}
		case 'menu/fetchEnd': {
			return {
				...currentState,
				isLoading: false,
			};
		}
		default: {
			return currentState;
		}
	}
}

export { menuReducer, MENU_INITIAL_STATE };
