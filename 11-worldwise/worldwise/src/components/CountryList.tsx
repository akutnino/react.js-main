import type { CityDataType } from '../types/components/types.ts';
import styles from '../styles/components/CountryList.module.scss';

import CountryItem from './CountryItem.tsx';
import Spinner from './Spinner.tsx';
import Message from './Message.tsx';

function CountryList({
	cities,
	isLoading,
}: {
	cities: CityDataType[];
	isLoading: boolean;
}) {
	const filteredCountries: CityDataType[] = cities.reduce(
		(acc: CityDataType[], curr: CityDataType) => {
			if (!acc.length) acc.push(curr);
			if (acc.length) {
				const flat = acc.map((obj) => Object.entries(obj)).flat(2);
				if (!flat.includes(curr.country)) acc.push(curr);
			}

			return acc;
		},
		[]
	);

	return (
		<>
			{isLoading && <Spinner />}

			{!isLoading && !filteredCountries.length ? (
				<Message message='Add a City by Clicking on the Map.' />
			) : (
				<ul className={styles.countryList}>
					{filteredCountries.map((cityObject: CityDataType) => (
						<CountryItem
							cityObject={cityObject}
							key={cityObject.id}
						/>
					))}
				</ul>
			)}
		</>
	);
}

export default CountryList;
