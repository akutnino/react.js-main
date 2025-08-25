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
				/>
				<Route
					path='*'
					element={<PageNotFound />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
