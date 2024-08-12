import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CitiesProvider } from '../contexts/CitiesContext';

import Homepage from '../pages/Homepage';
import Product from '../pages/Product';
import Pricing from '../pages/Pricing';
import PageNotFound from '../pages/PageNotFound';
import AppLayout from '../pages/AppLayout';
import Login from '../pages/Login';
import CityList from './CityList';
import CountryList from './CountryList';
import City from './City';
import Form from './Form';

export default function App() {
	return (
		<CitiesProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Homepage />}
					/>
					<Route
						path='product'
						element={<Product />}
					/>
					<Route
						path='pricing'
						element={<Pricing />}
					/>
					<Route
						path='login'
						element={<Login />}
					/>
					<Route
						path='app'
						element={<AppLayout />}
					>
						<Route
							index
							element={
								<Navigate
									replace
									to='cities'
								/>
							}
						/>
						<Route
							path='cities'
							element={<CityList />}
						/>
						<Route
							path='cities/:id'
							element={<City />}
						/>
						<Route
							path='countries'
							element={<CountryList />}
						/>
						<Route
							path='form'
							element={<Form />}
						/>
					</Route>
					<Route
						path='*'
						element={<PageNotFound />}
					/>
				</Routes>
			</BrowserRouter>
		</CitiesProvider>
	);
}
