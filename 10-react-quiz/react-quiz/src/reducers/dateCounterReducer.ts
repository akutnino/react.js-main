import type {
	DateCounterActionType,
	InitalDateCounterStateType,
} from '../types/components/types.ts';

export const INITIAL_DATE_COUNTER_STATE: InitalDateCounterStateType = {
	count: 0,
	step: 1,
};

function dateCounterReducer(
	currentState: InitalDateCounterStateType,
	action: DateCounterActionType
): InitalDateCounterStateType {
	console.log(currentState, action);

	switch (action.type) {
		case 'setCount': {
			return {
				...currentState,
				count: action.payload,
			};
		}
		case 'setStep': {
			return {
				...currentState,
				step: action.payload,
			};
		}
		case 'decreasing': {
			return {
				...currentState,
				count: currentState.count - currentState.step,
			};
		}
		case 'increasing': {
			return {
				...currentState,
				count: currentState.count + currentState.step,
			};
		}
		case 'reset': {
			return INITIAL_DATE_COUNTER_STATE;
		}
		default: {
			return currentState;
		}
	}
}

export { dateCounterReducer };
