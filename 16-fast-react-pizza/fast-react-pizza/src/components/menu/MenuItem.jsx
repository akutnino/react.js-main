import { formatCurrency } from '../../utils/helpers';
import PropTypes from 'prop-types';

MenuItem.propTypes = {
	pizzaObject: PropTypes.object,
};

function MenuItem(props) {
	const { pizzaObject } = props;
	const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizzaObject;

	return (
		<li>
			<img
				src={imageUrl}
				alt={name}
			/>
			<div>
				<p>{name}</p>
				<p>{ingredients.join(', ')}</p>
				<div>{!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}</div>
			</div>
		</li>
	);
}

export default MenuItem;
