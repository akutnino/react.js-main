import styles from '../styles/components/CityItem.module.scss';
import { formatDate } from '../functions/formatDate.ts';
import type { CityDataType } from '../types/components/types.ts';
import { unicodeToEmoji } from '../functions/unicodeToEmoji.ts';

function CityItem({ cityObject }: { cityObject: CityDataType }) {
	const { cityName, emoji, date }: CityDataType = cityObject;

	return (
		<li className={styles.cityItem}>
			<span className={styles.emoji}>
				<img src={`https://flagsapi.com/${unicodeToEmoji(emoji)}/flat/32.png`} />
			</span>
			<h3 className={styles.name}>{cityName}</h3>
			<time className={styles.date}>({formatDate(date)})</time>
			<button
				className={styles.deleteBtn}
				type='button'
			>
				&times;
			</button>
		</li>
	);
}

export default CityItem;
