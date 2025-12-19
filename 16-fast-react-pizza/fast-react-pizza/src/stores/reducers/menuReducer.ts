import type { MenuInitialStateType } from '../../types/stores/reducers/types.ts';

const MENU_INITIAL_STATE: MenuInitialStateType = {
	menu: [],
	isLoading: false,
};

function menuReducer(currentState = MENU_INITIAL_STATE, action): MenuInitialStateType {
	switch (action.type) {
		case 'menu/': {
			return {
				...currentState,
			};
		}
		default: {
			return currentState;
		}
	}
}

export { menuReducer };
