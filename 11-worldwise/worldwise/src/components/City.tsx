import { useParams, useSearchParams, type Params } from 'react-router';
import type { CurrentCityType, UseSearchParamsType } from '../types/components/types.ts';
import { formatDate } from '../functions/formatDate.ts';
import styles from '../styles/components/City.module.scss';

import CountryIcon from './CountryIcon.tsx';

// TEMP DATA
const currentCity: CurrentCityType = {
	cityName: 'Lisbon',
	emoji: '🇵🇹',
	date: '2027-10-31T15:59:59.138Z',
	notes: 'My favorite city so far!',
};

function City() {
	const { cityName, emoji, date, notes }: CurrentCityType = currentCity;
	const { id }: Readonly<Params<string>> = useParams();
	const [searchParams, setSearchParams]: UseSearchParamsType = useSearchParams();
	const lat: string | null = searchParams.get('lat');
	const lng: string | null = searchParams.get('lng');

	console.log(id, lng, lat);

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>
						<CountryIcon countryCode={emoji} />
					</span>
					{cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target='_blank'
					rel='noreferrer'
				>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>

			<div>{/* <ButtonBack /> */}</div>
		</div>
	);
}

export default City;
