export const formatDate = (date: string | null) => {
	if (date === null) return null;
	return new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date));
};
