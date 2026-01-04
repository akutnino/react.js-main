import { Suspense, useLayoutEffect } from 'react';
import { Outlet, useLocation, useParams, type Location, type Params } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrder } from '../../stores/selectors/orderSelectors.ts';
import { clearError } from '../../stores/actions/orderActions.ts';
import type { OrderInitialStateType } from '../../types/stores/reducers/order-types.ts';
import type { AppDispatch } from '../../types/stores/types.ts';

import { Error } from '../App.tsx';
import SpinnerFullPage from './SpinnerFullPage.tsx';
import Header from './Header.tsx';
import CartOverview from '../features/cart/CartOverview.tsx';

function Layout() {
	const { errorMessage }: OrderInitialStateType = useSelector(selectOrder);
	const { orderId } = useParams<Readonly<Params<'orderId'>>>();

	const dispatch: AppDispatch = useDispatch();
	const location: Location = useLocation();

	useLayoutEffect(() => {
		if (orderId === undefined && errorMessage !== null) dispatch(clearError());
		return () => {};
	}, [orderId, errorMessage, dispatch]);

	return (
		<ErrorBoundary
			key={location.key}
			fallback={<Error />}
		>
			<Suspense
				key={location.key}
				fallback={<SpinnerFullPage />}
			>
				<Header />
				<Outlet />
				<CartOverview />
			</Suspense>
		</ErrorBoundary>
	);
}

export default Layout;
