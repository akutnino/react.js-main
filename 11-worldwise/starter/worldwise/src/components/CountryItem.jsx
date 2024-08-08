import styles from '../styles/CountryItem.module.scss';
import PropTypes from 'prop-types';

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
			src={`https://flagsapi.com/${flagCodeString}/flat/64.png`}
			alt='flagEmoji'
		/>
	);
};

CountryItem.propTypes = {
	country: PropTypes.object
};

export default function CountryItem(props) {
	const { country } = props;

	return (
		<li className={styles.countryItem}>
			<span>{unicodeToEmoji(country.emoji)}</span>
			<span>{country.country}</span>
		</li>
	);
}
