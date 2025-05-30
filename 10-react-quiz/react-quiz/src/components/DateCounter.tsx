import { useReducer, type ChangeEvent } from 'react';

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

type ActionType = CountActionType | SettingActionType | ResetActionType;

type InitalStateType = {
	count: number;
	step: number;
};

const INITIAL_STATE: InitalStateType = {
	count: 0,
	step: 1,
};

function reducer(currentState: InitalStateType, action: ActionType): InitalStateType {
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
			return INITIAL_STATE;
		}
		default: {
			return currentState;
		}
	}
}

function DateCounter() {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const { count, step }: InitalStateType = state;

	// This mutates the date object.
	const date = new Date('june 21 2027');
	date.setDate(date.getDate() + count);

	const handleDecrease = function () {
		dispatch({ type: 'decreasing' });
	};

	const handleIncrease = function () {
		dispatch({ type: 'increasing' });
	};

	const defineCount = function (event: ChangeEvent<HTMLInputElement>) {
		dispatch({
			type: 'setCount',
			payload: Number(event.target.value),
		});
	};

	const defineStep = function (event: ChangeEvent<HTMLInputElement>) {
		dispatch({
			type: 'setStep',
			payload: Number(event.target.value),
		});
	};

	const handleReset = function () {
		dispatch({ type: 'reset' });
	};

	return (
		<div className='counter'>
			<div>
				<input
					type='range'
					min='0'
					max='10'
					value={step}
					onChange={defineStep}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button onClick={handleDecrease}>-</button>
				<input
					value={count}
					onChange={defineCount}
				/>
				<button onClick={handleIncrease}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={handleReset}>Reset</button>
			</div>
		</div>
	);
}
export default DateCounter;
