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

export type QuestionType = {
	question: string;
	options: string[];
	correctOption: number;
	points: number;
	id: string;
};

export type QuestionsArrayType = QuestionType[];

export type UserAnswerIndexType = null | number;

export type InitalReactQuizType = {
	questions: QuestionsArrayType;
	status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
	questionIndex: number;
	userAnswerIndex: UserAnswerIndexType;
	userTotalPoints: number;
};

type ReactQuizDataFailedActionType = {
	type: 'dataFailed';
	payload: string;
};

type ReactQuizDataReceivedActionType = {
	type: 'dataReceived';
	payload: QuestionsArrayType;
};

type ReactQuizStartQuizActionType = {
	type: 'startQuiz';
};

type ReactQuizUserAnswerActionType = {
	type: 'userAnswer';
	payload: number;
};

type ReactQuizNextQuestionActionType = {
	type: 'nextQuestion';
};

export type ReactQuizActionType =
	| ReactQuizDataReceivedActionType
	| ReactQuizDataFailedActionType
	| ReactQuizStartQuizActionType
	| ReactQuizUserAnswerActionType
	| ReactQuizNextQuestionActionType;
