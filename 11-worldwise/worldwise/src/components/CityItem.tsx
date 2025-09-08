import { Link } from 'react-router';
import { formatDate } from '../functions/formatDate.ts';
import type { CityDataType } from '../types/components/types.ts';
import styles from '../styles/components/CityItem.module.scss';

import CountryIcon from './CountryIcon.tsx';

function CityItem({ cityObject }: { cityObject: CityDataType }) {
	const { cityName, emoji, date, id, position }: CityDataType = cityObject;

	return (
		<li>
			<Link
				className={styles.cityItem}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className={styles.emoji}>
					<CountryIcon countryCode={emoji} />
				</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>({formatDate(date)})</time>
				<button
					className={styles.deleteBtn}
					type='button'
				>
					&times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;
