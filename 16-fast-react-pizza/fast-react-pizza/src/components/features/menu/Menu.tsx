import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, AppState } from '../../../types/stores/types.ts';
import { fetchData } from '../../../stores/actions/menuActions.ts';
import type {
	MenuDataType,
	MenuInitialStateType,
} from '../../../types/stores/reducers/types.ts';

const MenuKey = (menu: MenuDataType | null) => {
	return () => {
		if (menu !== null) return null;
		return import.meta.env.VITE_MENU_API;
	};
};

const MenuFetcher = (dispatch: AppDispatch, menu: MenuDataType | null) => {
	return () => {
		if (menu !== null) return;
		return dispatch(fetchData());
	};
};

function Menu() {
	const dispatch: AppDispatch = useDispatch();
	const { errorMessage, isLoading, menu }: MenuInitialStateType = useSelector(
		(store: AppState) => store.menu
	);

	useSWR(MenuKey(menu), MenuFetcher(dispatch, menu));
	console.log(`is Error? ${errorMessage ? 'yes' : 'no'}`, isLoading, menu);

	return <h1>Menu</h1>;
}

export default Menu;
