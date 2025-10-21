import { Suspense } from 'react';
import { Outlet, useLocation, type Location } from 'react-router';

import SpinnerFullPage from './SpinnerFullPage.tsx';

function Layout() {
	const location: Location = useLocation();

	return (
		<Suspense
			fallback={<SpinnerFullPage />}
			key={location.key}
		>
			<Outlet />
		</Suspense>
	);
}

export default Layout;
