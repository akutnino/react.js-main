import styles from '../styles/components/City.module.scss';
import type { CurrentCityType } from '../types/components/types.ts';

const formatDate = (date: string | null) => {
	if (date === null) return null;
	return new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date));
};

// TEMP DATA
const currentCity: CurrentCityType = {
	cityName: 'Lisbon',
	emoji: '🇵🇹',
	date: '2027-10-31T15:59:59.138Z',
	notes: 'My favorite city so far!',
};

function City() {
	const { cityName, emoji, date, notes }: CurrentCityType = currentCity;

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{emoji}</span> {cityName}
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
