import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { action as updateOrderAction } from './order/UpdateOrder';
import Menu, { loader as menuLoader } from './menu/Menu';
import Order, { loader as orderLoader } from './order/Order';
import CreateOrder, { action as createOrderAction } from './order/CreateOrder';
import Home from '../interfaces/Home';
import Cart from './cart/Cart';
import AppLayout from '../interfaces/AppLayout';
import Error from '../interfaces/Error';

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/menu',
				element: <Menu />,
				loader: menuLoader,
				errorElement: <Error />,
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/order/new',
				element: <CreateOrder />,
				action: createOrderAction,
			},
			{
				path: '/order/:orderId',
				element: <Order />,
				loader: orderLoader,
				action: updateOrderAction,
				errorElement: <Error />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
