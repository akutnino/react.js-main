import type { CityDataType } from '../types/components/types.ts';
import type { CitiesContextValue } from '../types/contexts/types.ts';
import { useCities } from '../contexts/CitiesContext.tsx';
import styles from '../styles/components/CityList.module.scss';

import CityItem from './CityItem.tsx';
import Message from './Message.tsx';
import Spinner from './Spinner.tsx';

function CityList() {
	const { cities, isLoading }: CitiesContextValue = useCities();

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
