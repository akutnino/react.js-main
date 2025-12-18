import { Suspense } from 'react';
import { Outlet, useLocation, type Location } from 'react-router';

import SpinnerFullPage from './SpinnerFullPage.tsx';
import Header from './Header.tsx';
import CartOverview from '../features/cart/CartOverview.tsx';

function Layout() {
	const loaction: Location = useLocation();

	return (
		<Suspense
			key={loaction.key}
			fallback={<SpinnerFullPage />}
		>
			<Header />
			<Outlet />
			<CartOverview />
		</Suspense>
	);
}

export default Layout;
