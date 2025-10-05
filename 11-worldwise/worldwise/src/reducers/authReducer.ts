import type { AuthActionType, AuthInitialStateType } from '../types/reducers/types.ts';

export const AUTH_INITIAL_STATE: AuthInitialStateType = {
	user: null,
	isAuthenticated: false,
};

export function authReducer(
	currentState: AuthInitialStateType,
	action: AuthActionType
): AuthInitialStateType {
	switch (action.type) {
		case 'user/login': {
			return {
				...currentState,
				user: action.payload,
				isAuthenticated: true,
			};
		}
		case 'user/logout': {
			return {
				...currentState,
				user: null,
				isAuthenticated: false,
			};
		}
		default: {
			return currentState;
		}
	}
}
