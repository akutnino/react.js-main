import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { CitiesProvider } from '../contexts/CitiesContext.tsx';
import { AuthProvider } from '../contexts/FakeAuthContext.tsx';

import CityList from './CityList.tsx';
import CountryList from './CountryList.tsx';
import City from './City.tsx';
import Form from './Form.tsx';
import Layout from './Layout.tsx';

const Homepage = lazy(() => import('../pages/Homepage.tsx'));
const Product = lazy(() => import('../pages/Product.tsx'));
const Pricing = lazy(() => import('../pages/Pricing.tsx'));
const Login = lazy(() => import('../pages/Login.tsx'));
const AppLayout = lazy(() => import('../pages/AppLayout.tsx'));
const PageNotFound = lazy(() => import('../pages/PageNotFound.tsx'));

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter basename='/'>
					<Routes>
						<Route
							path='/'
							element={<Layout />}
						>
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
						</Route>
						<Route
							path='*'
							element={<PageNotFound />}
						/>
					</Routes>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
