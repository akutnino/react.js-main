export const unicodeToEmoji = (countryCode: string) => {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char: string, index: number) => 127397 + char.charCodeAt(index));
	return String.fromCodePoint(...codePoints);
};
