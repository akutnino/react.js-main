import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../interfaces/Home';
import Menu, { loader as menuLoader } from './menu/Menu';
import Cart from './cart/Cart';
import CreateOrder from './order/CreateOrder';
import Order from './order/Order';
import AppLayout from '../interfaces/AppLayout';

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/menu',
				element: <Menu />,
				loader: menuLoader,
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/order/new',
				element: <CreateOrder />,
			},
			{
				path: '/order/:orderId',
				element: <Order />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
