import type { UserUpdateUsernameActionType } from '../../types/stores/actions/user-types.ts';
import { userTypes } from '../_constants/userTypes.ts';

export function updatedUsername(newUsername: string): UserUpdateUsernameActionType {
	return {
		type: userTypes.USER_UPDATE_USERNAME,
		payload: newUsername,
	};
}
