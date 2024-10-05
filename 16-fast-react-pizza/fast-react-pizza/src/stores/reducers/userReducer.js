const INITIAL_STATE_USER = {
	userName: '',
	position: {},
	address: '',
	isLoading: false,
	errorMessage: '',
};

function userReducer(currentState = INITIAL_STATE_USER, action) {
	switch (action.type) {
		case 'user/inputUserName':
			return {
				...currentState,
				userName: action.payload,
			};

		case 'user/fetchingAddress':
			return {
				...currentState,
				isLoading: true,
			};

		case 'user/fetchAddress':
			return {
				...currentState,
				position: action.payload.position,
				address: action.payload.address,
				isLoading: false,
			};

		case 'user/fetchAddressError':
			return {
				...currentState,
				isLoading: false,
				errorMessage: action.payload,
			};

		default:
			return currentState;
	}
}

export default userReducer;
