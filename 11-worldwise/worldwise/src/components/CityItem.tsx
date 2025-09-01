import styles from '../styles/components/CityItem.module.scss';
import { formatDate } from '../functions/formatDate.ts';
import type { CityDataType } from '../types/components/types.ts';

function CityItem({ cityObject }: { cityObject: CityDataType }) {
	const { cityName, emoji, date }: CityDataType = cityObject;

	return (
		<li className={styles.cityItem}>
			<span className={styles.emoji}>{emoji}</span>
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
