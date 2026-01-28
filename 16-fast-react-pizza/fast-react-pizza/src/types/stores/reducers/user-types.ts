export type UserPositionStateType = {
	latitude: string;
	longitude: string;
};

export type UserInitialStateType = {
	username: null | string;
	isLoading: boolean;
	position: null | UserPositionStateType;
	address: null | string;
	errorMessage: null | string;
};
