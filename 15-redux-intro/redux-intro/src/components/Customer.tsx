import { useSelector } from 'react-redux';
import type { AppState } from '../types/stores/types.ts';

function Customer() {
	const customerName: string = useSelector((store: AppState) => store.customer.fullName);

	return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
