export const unicodeToEmoji = (countryCode: string): string => {
	const countryCodeChar = [...countryCode].map((char: string) => {
		const CHARCODE_LAST_CHARACTER: number = 'Z'.charCodeAt(0);
		const UNITCODE_LAST_CHARACTER: number = 127487; // www.alt-codes.net/flags

		const countryCodePoint: number = char.codePointAt(0)!;
		const countryCharCode: number = UNITCODE_LAST_CHARACTER - countryCodePoint;

		return String.fromCodePoint(CHARCODE_LAST_CHARACTER - countryCharCode);
	});

	return countryCodeChar.join('');
};
