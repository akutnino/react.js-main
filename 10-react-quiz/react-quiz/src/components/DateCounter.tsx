import { useReducer, type ChangeEvent } from 'react';
import type { InitalDateCounterStateType } from '../types/components/types.ts';
import {
	dateCounterReducer,
	INITIAL_DATE_COUNTER_STATE,
} from '../reducers/dateCounterReducer.ts';

function DateCounter() {
	const [state, dispatch] = useReducer(dateCounterReducer, INITIAL_DATE_COUNTER_STATE);
	const { count, step }: InitalDateCounterStateType = state;

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
