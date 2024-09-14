import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE_CUSTOMER = {
	fullName: '',
	nationalID: '',
	createdAt: '',
};

const customerSlice = createSlice({
	name: 'customer',
	initialState: INITIAL_STATE_CUSTOMER,
	reducers: {
		createCustomer: {
			prepare: (fullName, nationalID) => {
				return {
					payload: {
						fullName,
						nationalID,
						createdAt: new Date().toISOString(),
					},
				};
			},
			reducer: (currentState, action) => {
				currentState.fullName = action.payload.fullName;
				currentState.nationalID = action.payload.nationalID;
				currentState.createdAt = action.payload.createdAt;
			},
		},
		updateName: (currentState, action) => {
			currentState.fullName = action.payload.fullName;
		},
	},
});

const {
	reducer,
	actions: { createCustomer, updateName },
} = customerSlice;

export { reducer as default, createCustomer, updateName };
