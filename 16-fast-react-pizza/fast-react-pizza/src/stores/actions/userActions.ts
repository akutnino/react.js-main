import type { UserUpdateUsernameActionType } from '../../types/stores/actions/user-types.ts';

export function updatedUsername(newUsername: string): UserUpdateUsernameActionType {
	return {
		type: 'user/updateUsername',
		payload: newUsername,
	};
}
