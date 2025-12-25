import type { MenuInitialStateType } from '../../types/stores/reducers/types.ts';
import type { AppState } from '../../types/stores/types.ts';

const selectMenu = (store: AppState): MenuInitialStateType => store.menu;

export { selectMenu };
