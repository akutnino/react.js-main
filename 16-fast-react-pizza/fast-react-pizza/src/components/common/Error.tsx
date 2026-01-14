import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, type NavigateFunction } from 'react-router';
import { selectMenu } from '../../stores/selectors/menuSelectors.ts';
import { selectOrder } from '../../stores/selectors/orderSelectors.ts';
import { resetOrderState } from '../../stores/actions/orderActions.ts';
import type { MenuInitialStateType } from '../../types/stores/reducers/menu-types.ts';
import type { OrderInitialStateType } from '../../types/stores/reducers/order-types.ts';
import type { AppDispatch } from '../../types/stores/types.ts';

function Error() {
	const dispatch: AppDispatch = useDispatch();
	const navigate: NavigateFunction = useNavigate();
	const { errorMessage: menuErrorMessage }: MenuInitialStateType = useSelector(selectMenu); // prettier-ignore
	const { errorMessage: orderErrorMessage }: OrderInitialStateType = useSelector(selectOrder); // prettier-ignore

	const isError: boolean = menuErrorMessage !== '' || orderErrorMessage !== '';
	const errorMessage = menuErrorMessage || orderErrorMessage;

	const handleBack = () => {
		navigate('/', { replace: true });
		dispatch(resetOrderState());
	};

	return (
		<div>
			<h1>Something went wrong 😢</h1>
			{isError && <p>{errorMessage}</p>}

			<button
				className='text-sm text-blue-500 hover:text-blue-600 hover:underline'
				onClick={handleBack}
			>
				&larr; Go back
			</button>
		</div>
	);
}

export default Error;
