import type {
	CustomerCreateCustomerActionType,
	CustomerUpdateNameActionType,
} from '../../types/stores/actions/customer-types.ts';

export function createCustomer(
	fullName: string,
	nationalID: string
): CustomerCreateCustomerActionType {
	return {
		type: 'customer/createCustomer',
		payload: {
			fullName,
			nationalID,
			createdAt: new Date().toISOString(),
		},
	};
}

export function updateName(updatedFullName: string): CustomerUpdateNameActionType {
	return {
		type: 'customer/updateName',
		payload: updatedFullName,
	};
}
