import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { CitiesProvider } from '../contexts/CitiesContext.tsx';

import Homepage from '../pages/Homepage.tsx';
import Product from '../pages/Product.tsx';
import Pricing from '../pages/Pricing.tsx';
import Login from '../pages/Login.tsx';
import AppLayout from '../pages/AppLayout.tsx';
import CityList from './CityList.tsx';
import CountryList from './CountryList.tsx';
import PageNotFound from '../pages/PageNotFound.tsx';
import City from './City.tsx';
import Form from './Form.tsx';

function App() {
	return (
		<CitiesProvider>
			<BrowserRouter basename='/'>
				<Routes>
					<Route
						index={true}
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
							index={true}
							element={
								<Navigate
									replace={true}
									to={'cities'}
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

export default App;
