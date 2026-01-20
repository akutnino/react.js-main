import type { userTypes } from '../../../stores/_constants/userTypes.ts';

export type UserUpdateUsernameActionType = {
	type: typeof userTypes.USER_UPDATE_USERNAME;
	payload: string;
};

export type UserReducerActionType = UserUpdateUsernameActionType;
