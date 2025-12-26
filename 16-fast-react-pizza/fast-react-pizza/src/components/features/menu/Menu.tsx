import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuData } from '../../../stores/actions/menuActions.ts';
import { selectMenu } from '../../../stores/selectors/menuSelectors.ts';
import type { AppDispatch } from '../../../types/stores/types.ts';
import type {
	MenuType,
	MenuInitialStateType,
} from '../../../types/stores/reducers/types.ts';

import { Error } from '../../App.tsx';
import LoadingIndicator from '../../common/LoadingIndicator.tsx';
import MenuList from './MenuList.tsx';

const MenuKey = (menu: MenuType) => {
	return () => {
		if (menu !== null) return null;
		return import.meta.env.VITE_MENU_API;
	};
};

const MenuFetcher = (dispatch: AppDispatch, menu: MenuType) => {
	return () => {
		if (menu !== null) return;
		return dispatch(fetchMenuData());
	};
};

function Menu() {
	const dispatch: AppDispatch = useDispatch();
	const { errorMessage, isLoading, menu }: MenuInitialStateType = useSelector(selectMenu);

	const isError: boolean = errorMessage !== '';
	const isMenuLoaded: boolean = !isLoading && !isError && menu !== null;

	useSWR(MenuKey(menu), MenuFetcher(dispatch, menu));

	return (
		<>
			{isLoading && <LoadingIndicator />}

			{isMenuLoaded && <MenuList />}

			{isError && <Error />}
		</>
	);
}

export default Menu;
