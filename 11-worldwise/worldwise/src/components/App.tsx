import { BrowserRouter, Route, Routes } from 'react-router';

import Homepage from '../pages/Homepage.tsx';
import Product from '../pages/Product.tsx';
import Pricing from '../pages/Pricing.tsx';
import Login from '../pages/Login.tsx';
import AppLayout from '../pages/AppLayout.tsx';
import PageNotFound from '../pages/PageNotFound.tsx';

function App() {
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
						element={<p>List of Cities</p>}
					/>
					<Route
						path='cities'
						element={<p>List of Cities</p>}
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
