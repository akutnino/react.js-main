function calcMinutesLeft(date: string): number {
	const d1: number = new Date().getTime();
	const d2: number = new Date(date).getTime();
	return Math.round((d2 - d1) / 60000);
}

export { calcMinutesLeft };
