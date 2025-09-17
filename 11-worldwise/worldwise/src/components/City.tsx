import { useEffect } from 'react';
import { useParams, useSearchParams, type Params } from 'react-router';
import { formatDate } from '../functions/formatDate.ts';
import { useCities } from '../contexts/CitiesContext.tsx';
import { fetchData } from '../functions/fetchData.ts';
import type { UseSearchParamsType } from '../types/components/types.ts';
import type { CitiesContextValue } from '../types/contexts/types.ts';
import styles from '../styles/components/City.module.scss';

import CountryIcon from './CountryIcon.tsx';
import Spinner from './Spinner.tsx';

function City() {
	const { isLoading, setIsLoading, currentCity, setCurrentCity }: CitiesContextValue =
		useCities();
	const { id }: Readonly<Params<string>> = useParams();
	const [searchParams, setSearchParams]: UseSearchParamsType = useSearchParams();
	const lat: string | null = searchParams.get('lat');
	const lng: string | null = searchParams.get('lng');
	const isNotNull: boolean = currentCity !== null;

	console.log(id, lng, lat);

	useEffect(() => {
		fetchData(`cities/${id}`, setIsLoading, setCurrentCity);
		return () => {};
	}, [id, setIsLoading, setCurrentCity]);

	return (
		<>
			{isLoading && <Spinner />}
			{!isLoading && isNotNull && (
				<div className={styles.city}>
					<div className={styles.row}>
						<h6>City name</h6>
						<h3>
							<span>
								<CountryIcon countryCode={currentCity!.emoji} />
							</span>
							{currentCity!.cityName}
						</h3>
					</div>

					<div className={styles.row}>
						<h6>You went to {currentCity!.cityName} on</h6>
						<p>{formatDate(currentCity!.date || null)}</p>
					</div>

					{currentCity!.notes && (
						<div className={styles.row}>
							<h6>Your notes</h6>
							<p>{currentCity!.notes}</p>
						</div>
					)}

					<div className={styles.row}>
						<h6>Learn more</h6>
						<a
							href={`https://en.wikipedia.org/wiki/${currentCity!.cityName}`}
							target='_blank'
							rel='noreferrer'
						>
							Check out {currentCity!.cityName} on Wikipedia &rarr;
						</a>
					</div>

					<div>{/* <ButtonBack /> */}</div>
				</div>
			)}
		</>
	);
}

export default City;
