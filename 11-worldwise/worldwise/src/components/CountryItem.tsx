import { unicodeToEmoji } from '../functions/unicodeToEmoji.ts';
import type { CityDataType } from '../types/components/types.ts';
import styles from '../styles/components/CountryItem.module.scss';

function CountryItem({ cityObject }: { cityObject: CityDataType }) {
	return (
		<li className={styles.countryItem}>
			<span>
				<img
					src={`https://flagsapi.com/${unicodeToEmoji(cityObject.emoji)}/flat/32.png`}
				/>
			</span>
			<span>{cityObject.country}</span>
		</li>
	);
}

export default CountryItem;
