import type {
	InitalReactQuizType,
	ReactQuizActionType,
} from '../types/components/types.ts';

export const INITIAL_REACT_QUIZ_STATE: InitalReactQuizType = {
	questions: [],
	status: 'loading',
	questionIndex: 0,
	userAnswerIndex: null,
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
			return {
				...currentState,
				userAnswerIndex: action.payload,
			};
		}
		default: {
			return currentState;
		}
	}
}

export { reactQuizReducer };
