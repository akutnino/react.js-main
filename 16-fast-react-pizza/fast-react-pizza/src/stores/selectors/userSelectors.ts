import type { UserInitialStateType } from '../../types/stores/reducers/user-types.ts';
import type { AppState } from '../../types/stores/types.ts';

const selectUser = (store: AppState): UserInitialStateType => store.user;

export { selectUser };
