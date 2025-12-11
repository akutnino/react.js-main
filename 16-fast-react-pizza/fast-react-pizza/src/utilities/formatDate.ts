function formatDate(date: string): string {
	return new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(date));
}

export { formatDate };
