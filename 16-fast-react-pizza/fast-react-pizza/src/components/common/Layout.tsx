import { Suspense } from 'react';
import { Outlet, useLocation, type Location } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';

import SpinnerFullPage from './SpinnerFullPage.tsx';
import Header from './Header.tsx';
import CartOverview from '../features/cart/CartOverview.tsx';

function Layout() {
	const loaction: Location = useLocation();

	return (
		<ErrorBoundary
			key={loaction.key}
			fallback={<div>Something went wrong...</div>}
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
