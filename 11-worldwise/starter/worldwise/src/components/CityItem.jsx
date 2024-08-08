import PropTypes from 'prop-types';
import styles from '../styles/CityItem.module.scss';
import { Link } from 'react-router-dom';

const unicodeToEmoji = (flagUnicode) => {
	const FIRST_CHARACTER_UNICODE = 127462; // https://www.alt-codes.net/flags

	const flagCodeString = [...flagUnicode]
		.map((flagChar) => {
			const unicodeDifference = flagChar.codePointAt() - FIRST_CHARACTER_UNICODE;

			return String.fromCharCode(unicodeDifference + 'A'.codePointAt());
		})
		.join('');

	return (
		<img
			src={`https://flagsapi.com/${flagCodeString}/flat/24.png`}
			alt='flagEmoji'
		/>
	);
};

const formatDate = (date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(new Date(date));

CityItem.propTypes = {
	cityObject: PropTypes.object
};

export default function CityItem(props) {
	const { cityObject } = props;
	const { cityName, date, emoji, id } = cityObject;

	return (
		<li>
			<Link
				to={`${id}`}
				className={styles.cityItem}
			>
				<span className={styles.emoji}>{unicodeToEmoji(emoji)}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.data}>( {formatDate(date)} )</time>
				<button className={styles.deleteBtn}>&times;</button>
			</Link>
		</li>
	);
}
