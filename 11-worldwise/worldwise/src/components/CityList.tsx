import styles from '../styles/components/CityList.module.scss';
import type { CityDataType } from '../types/components/types.ts';

import CityItem from './CityItem.tsx';
import Message from './Message.tsx';
import Spinner from './Spinner.tsx';

function CityList({ cities, isLoading }: { cities: CityDataType[]; isLoading: boolean }) {
	return (
		<>
			{isLoading && <Spinner />}

			{!isLoading && !cities.length ? (
				<Message message='Add a City by Clicking on the Map.' />
			) : (
				<ul className={styles.cityList}>
					{cities.map((cityObject: CityDataType) => (
						<CityItem
							cityObject={cityObject}
							key={cityObject.id}
						/>
					))}
				</ul>
			)}
		</>
	);
}

export default CityList;
