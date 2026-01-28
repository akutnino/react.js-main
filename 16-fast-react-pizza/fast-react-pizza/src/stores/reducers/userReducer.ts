import type { UserReducerActionType } from '../../types/stores/actions/user-types.ts';
import type { UserInitialStateType } from '../../types/stores/reducers/user-types.ts';
import { userTypes } from '../_constants/userTypes.ts';

const USER_INITIAL_STATE: UserInitialStateType = {
	username: null,
	isLoading: false,
	position: null,
	address: null,
	errorMessage: null,
};

function userReducer(
	currentState = USER_INITIAL_STATE,
	action: UserReducerActionType
): UserInitialStateType {
	switch (action.type) {
		case userTypes.USER_UPDATE_USERNAME: {
			return {
				...currentState,
				username: action.payload,
			};
		}
		case userTypes.USER_FETCH_ADDRESS: {
			return {
				...currentState,
				isLoading: true,
				errorMessage: null,
			};
		}
		case userTypes.USER_FETCH_ADDRESS_SUCCESS: {
			return {
				...currentState,
				isLoading: false,
				address: action.payload.address,
				position: action.payload.position,
			};
		}
		case userTypes.USER_FETCH_ADDRESS_ERROR: {
			return {
				...currentState,
				isLoading: false,
				position: null,
				address: null,
				errorMessage: action.payload,
			};
		}
		default: {
			return currentState;
		}
	}
}

export { userReducer, USER_INITIAL_STATE };
