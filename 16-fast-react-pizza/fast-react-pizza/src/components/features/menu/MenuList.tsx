import type { MenuInitialStateType } from '../../../types/stores/reducers/menu-types.ts';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../stores/selectors/menuSelectors.ts';

import MenuItem from './MenuItem.tsx';

function MenuList() {
	const { menu }: MenuInitialStateType = useSelector(selectMenu);
	const isMenuLoaded: boolean = menu !== null;

	return (
		<>
			{isMenuLoaded && (
				<ul className='divide-y divide-stone-200 px-2'>
					{menu!.map((menuItem) => (
						<MenuItem
							key={menuItem.id}
							pizza={menuItem}
						/>
					))}
				</ul>
			)}
		</>
	);
}

export default MenuList;
