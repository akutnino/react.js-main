import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
	const [citiesArray, setCitiesArray] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const controller = new AbortController();

		const fetchCities = async () => {
			try {
				setIsLoading(true);

				const fetchURL = `http://localhost:5000/cities`;
				const fetchOptions = {
					Headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					},
					Signal: controller.signal
				};

				const response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('Fetch Response Failed');

				const data = await response.json();
				setCitiesArray(data);
			} catch (error) {
				if (error.name !== 'AbortError') {
					console.error({ error });
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchCities();
		return () => {
			controller.abort();
		};
	}, []);

	return (
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
					element={<AppLayout isLoading={isLoading} />}
				>
					<Route
						index
						element={<CityList citiesArray={citiesArray} />}
					/>
					<Route
						path='cities'
						element={<CityList citiesArray={citiesArray} />}
					/>
					<Route
						path='cities/:id'
						element={<City />}
					/>
					<Route
						path='countries'
						element={<CountryList citiesArray={citiesArray} />}
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
	);
}
