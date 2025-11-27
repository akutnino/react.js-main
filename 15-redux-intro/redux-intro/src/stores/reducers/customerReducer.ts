import type { CustomerReducerActionType } from '../../types/stores/actions/customer-types.ts';
import type { CustomerInitialStateType } from '../../types/stores/reducers/types.ts';

const CUSTOMER_INITIAL_STATE: CustomerInitialStateType = {
	fullName: '',
	nationalID: '',
	createdAt: '',
};

const customerReducer = (
	currentState = CUSTOMER_INITIAL_STATE,
	action: CustomerReducerActionType
): CustomerInitialStateType => {
	switch (action.type) {
		case 'customer/createCustomer': {
			return {
				...currentState,
				fullName: action.payload.fullName,
				nationalID: action.payload.nationalID,
				createdAt: action.payload.createdAt,
			};
		}
		case 'customer/updateName': {
			return {
				...currentState,
				fullName: action.payload,
			};
		}
		default: {
			return currentState;
		}
	}
};

export { customerReducer, CUSTOMER_INITIAL_STATE };
