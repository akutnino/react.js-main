function formatCurrency(value: number): string {
	return new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'EUR',
	}).format(value);
}

export { formatCurrency };
