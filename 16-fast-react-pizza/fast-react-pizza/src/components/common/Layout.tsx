import { Suspense } from 'react';
import { Outlet, useLocation, type Location } from 'react-router';

import SpinnerFullPage from './SpinnerFullPage.tsx';

function Layout() {
	const loaction: Location = useLocation();

	return (
		<Suspense
			key={loaction.key}
			fallback={<SpinnerFullPage />}
		>
			<Outlet />
		</Suspense>
	);
}

export default Layout;
