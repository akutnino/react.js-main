export type UserUpdateUsernameActionType = {
	type: 'user/updateUsername';
	payload: string;
};

export type UserReducerActionType = UserUpdateUsernameActionType;
