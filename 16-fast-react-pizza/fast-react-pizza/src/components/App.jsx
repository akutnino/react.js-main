import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { updateOrderAction } from './order/UpdateOrder';
import Menu, { menuLoader } from './menu/Menu';
import Order, { orderLoader } from './order/Order';
import CreateOrder, { createOrderAction } from './order/CreateOrder';
import Home from '../interfaces/Home';
import Cart from './cart/Cart';
import AppLayout from '../interfaces/AppLayout';
import Error from '../interfaces/Error';

const myRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={<AppLayout />}
			errorElement={<Error />}
		>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/menu'
				element={<Menu />}
				loader={menuLoader}
				errorElement={<Error />}
			/>
			<Route
				path='/cart'
				element={<Cart />}
			/>
			<Route
				path='/order/new'
				element={<CreateOrder />}
				action={createOrderAction}
			/>
			<Route
				path='/order/:orderId'
				element={<Order />}
				loader={orderLoader}
				action={updateOrderAction}
				errorElement={<Error />}
			/>
		</Route>,
	),
);

function App() {
	return <RouterProvider router={myRouter} />;
}

export default App;
