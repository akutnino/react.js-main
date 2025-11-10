import { useSelector } from 'react-redux';
import type store from '../stores/store.ts';

type RootState = ReturnType<typeof store.getState>;

function Customer() {
	const customerName: string = useSelector((store: RootState) => store.customer.fullName);

	return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
