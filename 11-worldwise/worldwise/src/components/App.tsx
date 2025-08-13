import { BrowserRouter, Route, Routes } from 'react-router';

import Product from '../pages/Product.tsx';
import Pricing from '../pages/Pricing.tsx';
import Homepage from '../pages/Homepage.tsx';
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
					path='*'
					element={<PageNotFound />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
