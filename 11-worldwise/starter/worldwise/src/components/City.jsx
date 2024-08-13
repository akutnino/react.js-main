import { useParams } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import { useEffect } from 'react';
import styles from '../styles/City.module.scss';

const unicodeToEmoji = (flagCode) => {
	const FIRST_CHARACTER_UNICODE = 127462; // https://www.alt-codes.net/flags
	const flagCodeString = [...flagCode]
		.map((flagChar) => {
			const unicodeDifference = flagChar.codePointAt() - FIRST_CHARACTER_UNICODE;

			return String.fromCodePoint(unicodeDifference + 'A'.codePointAt());
		})
		.join('');

	return (
		<img
			src={`https://flagsapi.com/${flagCodeString}/flat/64.png`}
			alt='Flag Emoji'
		/>
	);
};

const formatDate = (date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
	}).format(new Date(date));

export default function City() {
	const { id } = useParams();
	const { currentCity, getCity } = useCities();
	const { cityName, emoji, date, notes } = currentCity;

	useEffect(() => {
		getCity(id);
		return () => {};
	}, [id]);

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{emoji ? unicodeToEmoji(emoji) : ''}</span> {cityName}
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
