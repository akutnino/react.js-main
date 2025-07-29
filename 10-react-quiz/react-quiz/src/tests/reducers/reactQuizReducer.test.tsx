import { fireEvent, render, renderHook } from '@testing-library/react';
import { useReducer } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { reactQuizReducer } from '../../reducers/reactQuizReducer.ts';
import type {
	InitalReactQuizType,
	ReactQuizActionType,
} from '../../types/components/types.ts';
import Button from '../../components/Button.tsx';

describe('reactQuizReducer test suite', () => {
	const DUMMY_INITIAL_REACT_QUIZ_STATE: InitalReactQuizType = {
		questions: [],
		status: 'loading',
		questionIndex: 0,
		userAnswerIndex: null,
		userTotalPoints: 0,
		userHighscore: 0,
		quizTimeRemaining: null,
	};

	test('should return the currentState as the default case', () => {
		const mockHandler = vi.fn(() => {
			result.current.dispatch({} as ReactQuizActionType);
		});

		const { result } = renderHook(() => {
			const [state, dispatch] = useReducer(
				reactQuizReducer,
				DUMMY_INITIAL_REACT_QUIZ_STATE
			);
			return { state, dispatch };
		});

		const { getByTestId } = render(<Button onClick={mockHandler}>Click</Button>);

		fireEvent.click(
			getByTestId('button'),
			new MouseEvent('click', {
				cancelable: true,
				bubbles: true,
			})
		);

		expect(mockHandler).toHaveBeenCalledOnce();
		expect(result.current.state).toBe(DUMMY_INITIAL_REACT_QUIZ_STATE);
	});
});
