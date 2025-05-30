import { useReducer, useState, type ChangeEvent } from 'react';

type CountActionType = {
	type: 'decreasing' | 'increasing';
};

type SettingActionType = {
	type: 'setting';
	payload: number;
};

type ActionType = CountActionType | SettingActionType;

function reducer(currentState: number, action: ActionType): number {
	console.log(currentState, action);

	if (action.type === 'decreasing') return currentState - 1;
	if (action.type === 'increasing') return currentState + 1;
	if (action.type === 'setting') return action.payload;
	return currentState;
}

function DateCounter() {
	// const [count, setCount] = useState<number>(0);
	const [count, dispatch] = useReducer(reducer, 0);
	const [step, setStep] = useState<number>(1);

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
			type: 'setting',
			payload: Number(event.target.value),
		});
	};

	const defineStep = function (event: ChangeEvent<HTMLInputElement>) {
		setStep(Number(event.target.value));
	};

	const handleReset = function () {
		setStep(1);
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
