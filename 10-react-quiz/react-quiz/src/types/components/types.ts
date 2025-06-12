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
	userHighscore: number;
	quizTimeRemaining: UserAnswerIndexType;
};

type ReactQuizDataReceivedActionType = {
	type: 'dataReceived';
	payload: QuestionsArrayType;
};

type ReactQuizDataFailedActionType = {
	type: 'dataFailed';
	payload: string;
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

type ReactQuizFinishQuizActionType = {
	type: 'finishQuiz';
};

type ReactQuizResetQuizActionType = {
	type: 'resetQuiz';
};

type ReactQuizUpdateQuizTimeActionType = {
	type: 'updateQuizTime';
};

export type ReactQuizActionType =
	| ReactQuizDataReceivedActionType
	| ReactQuizDataFailedActionType
	| ReactQuizStartQuizActionType
	| ReactQuizUserAnswerActionType
	| ReactQuizNextQuestionActionType
	| ReactQuizFinishQuizActionType
	| ReactQuizResetQuizActionType
	| ReactQuizUpdateQuizTimeActionType;
