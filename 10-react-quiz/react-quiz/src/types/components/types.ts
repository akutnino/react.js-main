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

export type ActionType = CountActionType | SettingActionType | ResetActionType;

export type InitalDateCounterStateType = {
	count: number;
	step: number;
};
