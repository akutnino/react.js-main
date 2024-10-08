import Button from '../../interfaces/Button';
import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';

async function action(props) {
	const { params } = props;
	const data = { priority: true };

	await updateOrder(params.orderId, data);
	return null;
}

function UpdateOrder() {
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
