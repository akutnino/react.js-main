import type { Dispatch, Reducer, Store } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { preLoadedState, rootReducer } from '../../stores/store.ts';
import type { MenuReducerActionType } from './actions/menu-types.ts';

export type AppActions = MenuReducerActionType;

export type RootReducerType = Reducer<typeof preLoadedState, AppActions>;

export type StoreType = Store<typeof preLoadedState, AppActions>;

export type AppState = ReturnType<typeof rootReducer>;

type DispatchType = Dispatch<AppActions>;

type ThunkDispatchType = ThunkDispatch<AppState, unknown, AppActions>;

export type AppDispatch = DispatchType & ThunkDispatchType;

export type AsyncThunkAction = ThunkAction<
	Promise<void> | void,
	AppState,
	unknown,
	AppActions
>;
