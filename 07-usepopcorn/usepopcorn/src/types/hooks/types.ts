import { type WatchedMovieDataType } from '../components/types.ts';

// prettier-ignore
export type SetWatchedCallbackType = (currentState: WatchedMovieDataType[]) => WatchedMovieDataType[];

export type SetWatchedType = (callback: SetWatchedCallbackType) => void;
