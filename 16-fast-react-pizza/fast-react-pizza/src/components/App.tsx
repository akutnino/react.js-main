import { BrowserRouter, Route, Routes } from 'react-router';
import { lazy } from 'react';

import Layout from './common/Layout.tsx';

const Home = lazy(() => import('./common/Home.tsx'));
const Menu = lazy(() => import('./features/menu/Menu.tsx'));
const Cart = lazy(() => import('./features/cart/Cart.tsx'));
const CreateOrder = lazy(() => import('./features/order/CreateOrder.tsx'));
const Order = lazy(() => import('./features/order/Order.tsx'));
const Error = lazy(() => import('./common/Error.tsx'));

function App() {
	return (
		<BrowserRouter basename='/'>
			<Routes>
				<Route
					path='/'
					element={<Layout />}
				>
					<Route
						index={true}
						element={<Home />}
					/>
					<Route
						path='menu'
						element={<Menu />}
					/>
					<Route
						path='cart'
						element={<Cart />}
					/>
					<Route
						path='order/new'
						element={<CreateOrder />}
					/>
					<Route
						path='order/:orderId'
						element={<Order />}
					/>
					<Route
						path='*'
						element={<Error />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export { App as default, Error };
