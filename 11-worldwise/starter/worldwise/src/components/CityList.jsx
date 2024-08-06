import styles from '../styles/CityList.module.scss';
import PropTypes from 'prop-types';
import CityItem from './CityItem';
import Message from './Message';

CityList.propTypes = {
	citiesArray: PropTypes.array
};

export default function CityList(props) {
	const { citiesArray } = props;
	const citiesArrayIsEmpty = citiesArray.length === 0;
	const emptyCitiesArrayMessage = 'Add Your First City by Clicking on the Map!';

	return (
		<>
			{citiesArrayIsEmpty ? (
				<Message message={emptyCitiesArrayMessage} />
			) : (
				<ul className={styles.cityList}>
					{citiesArray.map((cityObject) => (
						<CityItem
							cityObject={cityObject}
							key={cityObject.id}
						/>
					))}
				</ul>
			)}
		</>
	);
}
