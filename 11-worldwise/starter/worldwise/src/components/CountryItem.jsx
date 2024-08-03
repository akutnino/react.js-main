import styles from '../styles/CountryItem.module.scss';
import PropTypes from 'prop-types';

CountryItem.propTypes = {
	country: PropTypes.object
};

function CountryItem(props) {
	const { country } = props;

	return (
		<li className={styles.countryItem}>
			<span>{country.emoji}</span>
			<span>{country.country}</span>
		</li>
	);
}

export default CountryItem;
