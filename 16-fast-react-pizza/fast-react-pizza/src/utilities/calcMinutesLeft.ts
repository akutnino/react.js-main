function calcMinutesLeft(date: string): number {
	const d1 = new Date().getTime();
	const d2 = new Date(date).getTime();
	return Math.round((d2 - d1) / 60000);
}

export { calcMinutesLeft };
