import { BrowserRouter, Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';
import type { CityDataType } from '../types/components/types.ts';

import Homepage from '../pages/Homepage.tsx';
import Product from '../pages/Product.tsx';
import Pricing from '../pages/Pricing.tsx';
import Login from '../pages/Login.tsx';
import AppLayout from '../pages/AppLayout.tsx';
import CityList from './CityList.tsx';
import PageNotFound from '../pages/PageNotFound.tsx';

function App() {
	const [cities, setCities] = useState<CityDataType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchCitiesData = async () => {
			try {
				setIsLoading(true);

				const fetchURL: string = 'http://localhost:8000/cities';
				const fetchOptions: RequestInit = {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				};

				const response: Response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('Failed Fetch Request');

				const data: CityDataType[] = await response.json();
				setCities(data);
			} catch (error) {
				if (error instanceof Error) {
					console.log(error.message);
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchCitiesData();
		return () => {};
	}, []);

	return (
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
							<CityList
								cities={cities}
								isLoading={isLoading}
							/>
						}
					/>
					<Route
						path='cities'
						element={
							<CityList
								cities={cities}
								isLoading={isLoading}
							/>
						}
					/>
					<Route
						path='countries'
						element={<p>List of Countries</p>}
					/>
					<Route
						path='form'
						element={<p>Form</p>}
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

export default App;
