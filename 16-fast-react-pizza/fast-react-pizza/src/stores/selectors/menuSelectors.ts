import type { MenuInitialStateType } from '../../types/stores/reducers/menu-types.ts';
import type { AppState } from '../../types/stores/types.ts';

const selectMenu = (store: AppState): MenuInitialStateType => store.menu;

export { selectMenu };
