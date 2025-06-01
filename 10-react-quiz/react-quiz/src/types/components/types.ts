type CountActionType = {
	type: 'decreasing' | 'increasing';
};

type SettingActionType = {
	type: 'setCount' | 'setStep';
	payload: number;
};

type ResetActionType = {
	type: 'reset';
};

export type DateCounterActionType = CountActionType | SettingActionType | ResetActionType;

export type InitalDateCounterStateType = {
	count: number;
	step: number;
};
