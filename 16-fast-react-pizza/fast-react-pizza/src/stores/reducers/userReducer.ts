import type { UserReducerActionType } from '../../types/stores/actions/user-types.ts';
import type { UserInitialStateType } from '../../types/stores/reducers/user-types.ts';

const USER_INITIAL_STATE: UserInitialStateType = {
	username: null,
};

function userReducer(
	currentState = USER_INITIAL_STATE,
	action: UserReducerActionType
): UserInitialStateType {
	switch (action.type) {
		case 'user/updateUsername': {
			return {
				...currentState,
			};
		}
		default: {
			return currentState;
		}
	}
}

export { userReducer, USER_INITIAL_STATE };
