import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

async function menuLoader() {
	const menu = await getMenu();
	return menu;
}

function Menu() {
	const menu = useLoaderData();

	return (
		<ul className='divide-y divide-stone-200 px-2'>
			{menu.map((pizzaObject) => (
				<MenuItem
					pizzaObject={pizzaObject}
					key={pizzaObject.id}
				/>
			))}
		</ul>
	);
}

export { Menu as default, menuLoader };
