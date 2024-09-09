const INITIAL_STATE_CUSTOMER = {
	fullName: '',
	nationalID: '',
	createdAt: '',
};

const customerReducer = (currentState = INITIAL_STATE_CUSTOMER, action) => {
	switch (action.type) {
		case 'customer/createCustomer':
			return {
				...currentState,
				fullName: action.payload.fullName,
				nationalID: action.payload.nationalID,
				createdAt: action.payload.createdAt,
			};

		case 'customer/updateName':
			return {
				...currentState,
				fullName: action.payload,
			};

		default:
			return currentState;
	}
};

export function createCustomer(fullName, nationalID) {
	return {
		type: 'customer/createCustomer',
		payload: {
			fullName,
			nationalID,
			createdAt: new Date().toISOString(),
		},
	};
}

export function updateName(fullName) {
	return { type: 'customer/updateName', payload: fullName };
}

export default customerReducer;
