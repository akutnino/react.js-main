import { useSelector } from 'react-redux';
import type { RootState } from '../types/stores/types.ts';

import CreateCustomer from './CreateCustomer.tsx';
import Customer from './Customer.tsx';
import AccountOperations from './AccountOperations.tsx';
import BalanceDisplay from './BalanceDisplay.tsx';

function App() {
	const customerName: string = useSelector((store: RootState) => store.customer.fullName);

	return (
		<div>
			<h1>🏦 The React-Redux Bank ⚛️</h1>
			{!customerName && <CreateCustomer />}

			{customerName && (
				<>
					<Customer />
					<AccountOperations />
					<BalanceDisplay />
				</>
			)}
		</div>
	);
}

export default App;
