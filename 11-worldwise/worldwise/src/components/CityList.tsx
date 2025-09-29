import type { CityDataType } from '../types/components/types.ts';
import type { CitiesContextValue } from '../types/contexts/types.ts';
import type { MouseEvent } from 'react';
import { useCities } from '../contexts/CitiesContext.tsx';
import styles from '../styles/components/CityList.module.scss';

import CityItem from './CityItem.tsx';
import Message from './Message.tsx';
import Spinner from './Spinner.tsx';

function CityList() {
	const {
		cities,
		isLoading,
		currentCity,
		deleteCityData,
		setIsLoading,
		setCities,
	}: CitiesContextValue = useCities();

	const handleDeleteCity = (cityID: string) => {
		return (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			deleteCityData(cityID, setIsLoading, setCities);
		};
	};

	return (
		<>
			{isLoading && <Spinner />}

			{!cities.length && <Message message='Add a City by Clicking on the Map.' />}

			{!isLoading && (
				<ul className={styles.cityList}>
					{cities.map((cityObject: CityDataType) => (
						<CityItem
							onClick={handleDeleteCity(cityObject.id!)}
							currentCity={currentCity}
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
