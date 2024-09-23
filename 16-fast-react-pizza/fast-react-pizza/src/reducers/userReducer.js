const INITIAL_STATE_USER = {};

function userReducer(currentState = INITIAL_STATE_USER, action) {
	switch (action.type) {
		case '':
			return;

		default:
			return currentState;
	}
}

export default userReducer;
