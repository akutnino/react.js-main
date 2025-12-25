import { Suspense } from 'react';
import { Outlet, useLocation, type Location } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';

import { Error } from '../App.tsx';
import SpinnerFullPage from './SpinnerFullPage.tsx';
import Header from './Header.tsx';
import CartOverview from '../features/cart/CartOverview.tsx';

function Layout() {
	const loaction: Location = useLocation();

	return (
		<ErrorBoundary
			key={loaction.key}
			fallback={<Error />}
		>
			<Suspense
				key={loaction.key}
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
