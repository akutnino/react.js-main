import type { CustomerInitialStateType } from '../reducers/types.ts';

export type CustomerCreateCustomerActionType = {
	type: 'customer/createCustomer';
	payload: CustomerInitialStateType;
};

export type CustomerUpdateNameActionType = {
	type: 'customer/updateName';
	payload: string;
};

export type CustomerReducerActionType =
	| CustomerCreateCustomerActionType
	| CustomerUpdateNameActionType;
