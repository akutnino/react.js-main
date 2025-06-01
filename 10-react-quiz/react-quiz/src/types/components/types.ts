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

export type QuestionsArrayType = {
	question: string;
	options: string[];
	correctOption: number;
	points: number;
	id: string;
}[];

export type InitalReactQuizType = {
	questions: QuestionsArrayType;
	status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
};

type ReactQuizDataFailedActionType = {
	type: 'dataFailed';
	payload: string;
};

type ReactQuizDataReceivedActionType = {
	type: 'dataReceived';
	payload: QuestionsArrayType;
};

export type ReactQuizActionType =
	| ReactQuizDataReceivedActionType
	| ReactQuizDataFailedActionType;
