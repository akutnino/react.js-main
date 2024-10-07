import Button from '../../interfaces/Button';
import PropTypes from 'prop-types';
import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';

UpdateOrder.propTypes = {
	order: PropTypes.object,
};

async function action(props) {
	const { request, params } = props;
	const data = { priority: true };

	await updateOrder(params.orderId, data);
	return null;
}

function UpdateOrder(props) {
	const { order } = props;
	const { id } = order;
	const fetcher = useFetcher();

	return (
		<fetcher.Form
			method='PATCH'
			className='text-right'
		>
			<Button type={'primary'}>Make Priority</Button>
		</fetcher.Form>
	);
}

export { UpdateOrder as default, action };
