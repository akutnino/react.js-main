import type store from '../../stores/store.ts';

export type RootState = ReturnType<typeof store.getState>;
