import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../interfaces/Home';
import Menu from './menu/Menu';
import Cart from './cart/Cart';
import CreateOrder from './order/CreateOrder';
import Order from './order/Order';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/menu',
		element: <Menu />,
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
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
