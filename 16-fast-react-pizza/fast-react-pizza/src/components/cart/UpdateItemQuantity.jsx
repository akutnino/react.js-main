import { useDispatch } from 'react-redux';
import {
	decreaseItemQuantity,
	increaseItemQuantity,
} from '../../stores/actions/cartActions';
import Button from '../../interfaces/Button';
import PropTypes from 'prop-types';

UpdateItemQuantity.propTypes = {
	pizzaId: PropTypes.number,
	quantity: PropTypes.number,
};

function UpdateItemQuantity(props) {
	const { pizzaId, quantity } = props;
	const dispatch = useDispatch();

	const handledecreaseQuantity = () => {
		dispatch(decreaseItemQuantity(pizzaId));
	};

	const handleIncreaseQuantity = () => {
		dispatch(increaseItemQuantity(pizzaId));
	};

	return (
		<div className='ms:gap-3 flex items-center gap-1'>
			<Button
				type={'round'}
				onClick={handledecreaseQuantity}
			>
				-
			</Button>
			{quantity}
			<Button
				type={'round'}
				onClick={handleIncreaseQuantity}
			>
				+
			</Button>
		</div>
	);
}

export default UpdateItemQuantity;
