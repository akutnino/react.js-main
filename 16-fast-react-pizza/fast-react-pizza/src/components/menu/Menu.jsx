import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

async function loader() {
	const menu = await getMenu();
	return menu;
}

function Menu() {
	const menu = useLoaderData();

	return (
		<ul>
			{menu.map((pizzaObject) => (
				<MenuItem
					key={pizzaObject.id}
					pizzaObject={pizzaObject}
				/>
			))}
		</ul>
	);
}

export { Menu as default, loader };
