import { type } from '@testing-library/user-event/dist/type';
import { useReducer, useState } from 'react';

function reducerFunc(state, action) {
	console.log('The state is ====');
	console.log(state);
	console.log('The action payload is ====');
	console.log(action.payload);

	switch (action.type) {
		case 'dec':
			return { ...state, count: state.count - -action.payload };

		case 'inc':
			return { ...state, count: state.count + action.payload };

		case 'setCount':
			return { ...state, count: action.payload };

		case 'setStep':
			return { ...state, step: action.payload };

		case 'reset':
			return action.payload;

		default:
			throw new Error('Unknown action');
	}
}

function DateCounter() {
	const initialState = { count: 0, step: 1 };
	const [state, dispatch] = useReducer(reducerFunc, initialState);
	const { count, step } = state;

	console.log('The component state is ===');
	console.log(state);

	// This mutates the date object.
	const date = new Date('june 21 2027');
	date.setDate(date.getDate() + count);

	const dec = function () {
		dispatch({ type: 'dec', payload: -step });
	};

	const inc = function () {
		dispatch({ type: 'inc', payload: +step });
	};

	const defineCount = function (e) {
		dispatch({ type: 'setCount', payload: Number(e.target.value) });
	};

	const defineStep = function (e) {
		dispatch({ type: 'setStep', payload: Number(e.target.value) });
	};

	const reset = function () {
		dispatch({ type: 'reset', payload: initialState });
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
				<button onClick={dec}>-</button>
				<input
					value={count}
					onChange={defineCount}
				/>
				<button onClick={inc}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
}
export default DateCounter;
