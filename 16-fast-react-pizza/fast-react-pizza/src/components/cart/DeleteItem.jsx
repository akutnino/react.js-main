import { useDispatch } from 'react-redux';
import { deleteItem } from '../../stores/actions/cartActions';
import Button from '../../interfaces/Button';
import PropTypes from 'prop-types';

DeleteItem.propTypes = {
	pizzaId: PropTypes.number,
};

function DeleteItem(props) {
	const { pizzaId } = props;
	const dispatch = useDispatch();

	const handleDelete = (id) => {
		return () => dispatch(deleteItem(id));
	};

	return (
		<Button
			type='small'
			onClick={handleDelete(pizzaId)}
		>
			Delete
		</Button>
	);
}

export default DeleteItem;
