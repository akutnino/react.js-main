import { useSelector } from 'react-redux';
import type { RootState } from '../types/stores/types.ts';

function Customer() {
	const customerName: string = useSelector((store: RootState) => store.customer.fullName);

	return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
