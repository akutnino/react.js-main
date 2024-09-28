const INITIAL_STATE_USER = {
	userName: '',
};

function userReducer(currentState = INITIAL_STATE_USER, action) {
	switch (action.type) {
		case 'user/inputUserName':
			return {
				...currentState,
				userName: action.payload,
			};

		default:
			return currentState;
	}
}

export default userReducer;
