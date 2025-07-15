import { act, cleanup, render, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import type {
	InitalReactQuizType,
	UserAnswerIndexType,
} from '../../types/components/types.ts';
import { useReducer } from 'react';
import { reactQuizReducer } from '../../reducers/reactQuizReducer.ts';
import Timer from '../../components/Timer.tsx';
import MainContent from '../../components/MainContent.tsx';
import FinishScreen from '../../components/FinishScreen.tsx';

describe('Timer component test suite', () => {
	const mockDispatch = vi.fn();
	const DUMMY_QUIZTIMEREMAINING: UserAnswerIndexType = null;

	afterEach(() => {
		mockDispatch.mockClear();
		vi.clearAllTimers();
		vi.resetAllMocks();
		cleanup();
	});

	test('should render the component correctly', () => {
		const { getByTestId } = render(
			<Timer
				dispatch={mockDispatch}
				quizTimeRemaining={DUMMY_QUIZTIMEREMAINING}
			/>
		);

		expect(getByTestId('timer')).toBeInTheDocument();
		expect(getByTestId('timer')).toHaveTextContent('00:00');
	});

	test('should check if the component updates the time correctly', () => {
		const DUMMY_INITIAL_REACT_QUIZ_STATE: InitalReactQuizType = {
			questions: [],
			status: 'active',
			questionIndex: 0,
			userAnswerIndex: null,
			userTotalPoints: 0,
			userHighscore: 0,
			quizTimeRemaining: 1,
		};

		vi.useFakeTimers({ shouldAdvanceTime: true });
		const { result } = renderHook(() => {
			const [state, dispatch] = useReducer(
				reactQuizReducer,
				DUMMY_INITIAL_REACT_QUIZ_STATE
			);
			return { state, dispatch };
		});

		const { getByTestId, rerender } = render(
			<Timer
				dispatch={result.current.dispatch}
				quizTimeRemaining={result.current.state.quizTimeRemaining}
			/>
		);

		expect(getByTestId('timer')).toHaveTextContent('00:01');

		act(() => {
			vi.runAllTicks();
			vi.runOnlyPendingTimers();
		});

		rerender(
			<Timer
				dispatch={result.current.dispatch}
				quizTimeRemaining={result.current.state.quizTimeRemaining}
			/>
		);

		expect(getByTestId('timer')).toHaveTextContent('00:00');
	});

	test('should render the FinishScreen if the time is 0', () => {
		const DUMMY_MAXPOSSIBLEPOINTS: number = 10;
		const DUMMY_INITIAL_REACT_QUIZ_STATE: InitalReactQuizType = {
			questions: [],
			status: 'active',
			questionIndex: 0,
			userAnswerIndex: null,
			userTotalPoints: 0,
			userHighscore: 0,
			quizTimeRemaining: 0,
		};

		vi.useFakeTimers({ shouldAdvanceTime: true });
		const { result } = renderHook(() => {
			const [state, dispatch] = useReducer(
				reactQuizReducer,
				DUMMY_INITIAL_REACT_QUIZ_STATE
			);
			return { state, dispatch };
		});

		const { getByTestId, rerender } = render(
			<MainContent>
				{result.current.state.status === 'active' && (
					<Timer
						dispatch={result.current.dispatch}
						quizTimeRemaining={result.current.state.quizTimeRemaining}
					/>
				)}

				{result.current.state.status === 'finished' && (
					<FinishScreen
						userTotalPoints={result.current.state.userTotalPoints}
						maxPossiblePoints={DUMMY_MAXPOSSIBLEPOINTS}
						userHighscore={result.current.state.userHighscore}
						dispatch={result.current.dispatch}
					/>
				)}
			</MainContent>
		);

		act(() => {
			vi.runAllTicks();
			vi.runOnlyPendingTimers();
		});

		rerender(
			<MainContent>
				{result.current.state.status === 'active' && (
					<Timer
						dispatch={result.current.dispatch}
						quizTimeRemaining={result.current.state.quizTimeRemaining}
					/>
				)}

				{result.current.state.status === 'finished' && (
					<FinishScreen
						userTotalPoints={result.current.state.userTotalPoints}
						maxPossiblePoints={DUMMY_MAXPOSSIBLEPOINTS}
						userHighscore={result.current.state.userHighscore}
						dispatch={result.current.dispatch}
					/>
				)}
			</MainContent>
		);

		expect(getByTestId('main').firstElementChild).toHaveAttribute('class', 'result');
		expect(getByTestId('main').lastElementChild).toHaveAttribute('class', 'btn btn-ui');
	});

	test('should render correctly if the minutes is less that 10', () => {
		const DUMMY_INITIAL_REACT_QUIZ_STATE: InitalReactQuizType = {
			questions: [],
			status: 'active',
			questionIndex: 0,
			userAnswerIndex: null,
			userTotalPoints: 0,
			userHighscore: 0,
			quizTimeRemaining: 950,
		};

		const { getByTestId } = render(
			<Timer
				dispatch={mockDispatch}
				quizTimeRemaining={DUMMY_INITIAL_REACT_QUIZ_STATE.quizTimeRemaining}
			/>
		);

		expect(getByTestId('timer')).toHaveTextContent('15:50');
	});

	test('should render correctly if the seconds is less that 10', () => {
		const DUMMY_INITIAL_REACT_QUIZ_STATE: InitalReactQuizType = {
			questions: [],
			status: 'active',
			questionIndex: 0,
			userAnswerIndex: null,
			userTotalPoints: 0,
			userHighscore: 0,
			quizTimeRemaining: 9,
		};

		const { getByTestId } = render(
			<Timer
				dispatch={mockDispatch}
				quizTimeRemaining={DUMMY_INITIAL_REACT_QUIZ_STATE.quizTimeRemaining}
			/>
		);

		expect(getByTestId('timer')).toHaveTextContent('00:09');
	});
});
