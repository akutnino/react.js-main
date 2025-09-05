import { unicodeToEmoji } from '../functions/unicodeToEmoji.ts';

function CountryIcon({ countryCode }: { countryCode: string }) {
	return <img src={`https://flagsapi.com/${unicodeToEmoji(countryCode)}/flat/32.png`} />;
}

export default CountryIcon;
