import type {
	InitalReactQuizType,
	QuestionType,
	ReactQuizActionType,
} from '../types/components/types.ts';

export const INITIAL_REACT_QUIZ_STATE: InitalReactQuizType = {
	questions: [],
	status: 'loading',
	questionIndex: 0,
	userAnswerIndex: null,
	userTotalPoints: 0,
};

function reactQuizReducer(
	currentState: InitalReactQuizType,
	action: ReactQuizActionType
): InitalReactQuizType {
	switch (action.type) {
		case 'dataReceived': {
			return {
				...currentState,
				questions: action.payload,
				status: 'ready',
			};
		}
		case 'dataFailed': {
			return {
				...currentState,
				status: 'error',
			};
		}
		case 'startQuiz': {
			return {
				...currentState,
				status: 'active',
			};
		}
		case 'userAnswer': {
			const currentQuestionIndex: QuestionType =
				currentState.questions[currentState.questionIndex];

			const currentQuestionPoints: number = currentQuestionIndex.points;

			const updatedUserTotalPoints: number =
				currentQuestionIndex.correctOption === action.payload
					? currentState.userTotalPoints + currentQuestionPoints
					: currentState.userTotalPoints;

			return {
				...currentState,
				userAnswerIndex: action.payload,
				userTotalPoints: updatedUserTotalPoints,
			};
		}
		default: {
			return currentState;
		}
	}
}

export { reactQuizReducer };
