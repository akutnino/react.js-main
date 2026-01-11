import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams, type NavigateFunction, type Params } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderData } from '../../../stores/actions/orderActions.ts';
import { selectOrder } from '../../../stores/selectors/orderSelectors.ts';
import type { AppDispatch } from '../../../types/stores/types.ts';
import type { OrderInitialStateType } from '../../../types/stores/reducers/order-types.ts';

function SearchOrder() {
	const [query, setQuery] = useState<string>('');
	const { orderId } = useParams<Readonly<Params<'orderId'>>>();
	const { order }: OrderInitialStateType = useSelector(selectOrder);

	const dispatch: AppDispatch = useDispatch();
	const navigate: NavigateFunction = useNavigate();

	const handleInputNumber = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.currentTarget.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!query) return;

		const QueryIsParams: boolean = query === orderId;
		const QueryIsOrderID: boolean = query === order?.id;
		const QueryIsParamsAndOrderID: boolean = QueryIsParams && QueryIsOrderID;
		const QueryIsNotParamsButIsOrderID: boolean = !QueryIsParams && QueryIsOrderID;

		if (QueryIsParamsAndOrderID || QueryIsNotParamsButIsOrderID) {
			navigate(`order/${query}`, { replace: true });
		}
		if (!QueryIsParams && !QueryIsOrderID) {
			navigate(`order/${query}`, { replace: true });
			dispatch(fetchOrderData(query));
		}

		setQuery('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				id='search'
				placeholder={`Search Order Number`}
				onChange={handleInputNumber}
				value={query}
			/>
		</form>
	);
}

export default SearchOrder;
