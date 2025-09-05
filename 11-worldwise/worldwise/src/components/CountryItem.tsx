import type { CityDataType } from '../types/components/types.ts';
import styles from '../styles/components/CountryItem.module.scss';

import CountryIcon from './CountryIcon.tsx';

function CountryItem({ cityObject }: { cityObject: CityDataType }) {
	return (
		<li className={styles.countryItem}>
			<span>
				<CountryIcon countryCode={cityObject.emoji} />
			</span>
			<span>{cityObject.country}</span>
		</li>
	);
}

export default CountryItem;
