import { useSelector } from 'react-redux';
import type { RootState } from '../types/stores/types.ts';

function formatCurrency(value: number) {
	return new Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'USD',
	}).format(value);
}

function BalanceDisplay() {
	const balance: number = useSelector((store: RootState) => store.account.balance);

	return <div className='balance'>{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
