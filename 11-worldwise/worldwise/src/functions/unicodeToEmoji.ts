export const unicodeToEmoji = (countryCode: string): string => {
	const ENGLISH_ALPHABET: string[] = Array(26)
		.fill(null)
		.map((_, index) => String.fromCharCode(Number('A'.codePointAt(0)) + index));

	if (ENGLISH_ALPHABET.includes(countryCode.at(0)!)) return countryCode.toUpperCase();

	const countryCodeChar = [...countryCode].map((char: string) => {
		const CHARCODE_LAST_CHARACTER: number = 'Z'.charCodeAt(0);
		const UNITCODE_LAST_CHARACTER: number = 127487; // www.alt-codes.net/flags

		const countryCodePoint: number = char.codePointAt(0)!;
		const countryCharCode: number = UNITCODE_LAST_CHARACTER - countryCodePoint;

		return String.fromCodePoint(CHARCODE_LAST_CHARACTER - countryCharCode);
	});

	return countryCodeChar.join('');
};
