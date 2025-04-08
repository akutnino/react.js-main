import { useState } from 'react';
import { type WatchedMovieDataType } from '../types/components/types.ts';
import {
	type SetWatchedCallbackType,
	type SetWatchedType,
} from '../types/hooks/types.ts';

export function useLocalStorageState(
	initialState: [],
	key: string
): {
	watched: WatchedMovieDataType[];
	setWatched: SetWatchedType;
} {
	const [watched, setWatchedFunc] = useState<WatchedMovieDataType[]>(() => {
		const localStorageQuery: string = localStorage.getItem(key) as string;
		const isLocalStorageEmpty: boolean = JSON.parse(localStorageQuery) === null;

		if (isLocalStorageEmpty) {
			localStorage.setItem(key, JSON.stringify(initialState));
			return initialState;
		} else {
			return JSON.parse(localStorageQuery);
		}
	});

	const setWatched: SetWatchedType = (callback: SetWatchedCallbackType) => {
		localStorage.setItem(key, JSON.stringify(callback(watched)));
		setWatchedFunc(callback);
	};

	return { watched, setWatched };
}
