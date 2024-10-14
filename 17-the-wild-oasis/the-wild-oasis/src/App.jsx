import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
} from 'react-router-dom';
import Root from './pages/Root';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import NewUsers from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import GlobalStyles from './styles/GlobalStyles';

const Router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={<Root />}
		>
			<Route
				index
				element={
					<Navigate
						replace
						to='dashboard'
					/>
				}
			/>
			<Route
				path='dashboard'
				element={<Dashboard />}
			/>
			<Route
				path='bookings'
				element={<Bookings />}
			/>
			<Route
				path='cabins'
				element={<Cabins />}
			/>
			<Route
				path='users'
				element={<NewUsers />}
			/>
			<Route
				path='settings'
				element={<Settings />}
			/>
			<Route
				path='account'
				element={<Account />}
			/>
			<Route
				path='login'
				element={<Login />}
			/>
			<Route
				path='*'
				element={<PageNotFound />}
			/>
		</Route>
	)
);

function App() {
	return (
		<>
			<GlobalStyles />
			<RouterProvider router={Router} />
		</>
	);
}

export default App;
