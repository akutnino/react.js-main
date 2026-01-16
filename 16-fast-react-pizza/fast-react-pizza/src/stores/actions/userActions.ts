export function updatedUsername(newUsername: string) {
	return {
		type: 'user/updateUsername',
		payload: newUsername,
	};
}
