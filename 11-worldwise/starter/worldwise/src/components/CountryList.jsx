import PropTypes from 'prop-types';
import Message from './Message';
import CountryItem from './CountryItem';
import styles from '../styles/CountryList.module.scss';

CountryList.propTypes = {
	citiesArray: PropTypes.array
};

export default function CountryList(props) {
	const { citiesArray } = props;
	const citiesArrayIsEmpty = citiesArray.length === 0;
	const emptyCitiesArrayMessage = 'Add Your First City by Clicking on the Map!';

	const countriesArray = citiesArray.reduce((accumulator, currentObject) => {
		const countryName = Object.values(currentObject)[1];
		const accumulatorArray = accumulator
			.map((cityObject) => Object.entries(cityObject).flat())
			.flat();

		if (!accumulatorArray.includes(countryName)) accumulator.push(currentObject);
		return accumulator;
	}, []);

	return (
		<>
			{citiesArrayIsEmpty ? (
				<Message message={emptyCitiesArrayMessage} />
			) : (
				<ul className={styles.countryList}>
					{countriesArray.map((cityObject) => (
						<CountryItem
							country={cityObject}
							key={cityObject.id}
						/>
					))}
				</ul>
			)}
		</>
	);
}
