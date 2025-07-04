import {
	cleanup,
	fireEvent,
	render,
	renderHook,
	type Matcher,
	type MatcherOptions,
	type SelectorMatcherOptions,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useReducer } from 'react';
import type { InitalReactQuizType, QuestionType } from '../../types/components/types.ts';
import {
	INITIAL_REACT_QUIZ_STATE,
	reactQuizReducer,
} from '../../reducers/reactQuizReducer.ts';
import FinishScreen from '../../components/FinishScreen.tsx';

type RenderGetByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement;

type RenderGetByTextType = (
	id: Matcher,
	options?: SelectorMatcherOptions | undefined
) => HTMLElement;

describe('FinishScreen component test suite', () => {
	let renderGetByTestId: RenderGetByTestIdType;
	let renderGetByText: RenderGetByTextType;
	const mockDispatch = vi.fn();

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestNames: string[] = [
			'FinishScreen component test suite > should render the user quiz results correctly with an populated questions array',
		];

		if (exemptedTestNames.includes(currentTestName)) return;

		const { result } = renderHook(() => {
			const [state, dispatch] = useReducer(reactQuizReducer, INITIAL_REACT_QUIZ_STATE);
			return { state, dispatch };
		});

		const maxPossiblePoints: number = result.current.state.questions.reduce(
			(acc: number, curr: QuestionType) => curr.points + acc,
			0
		);

		const { getByTestId, getByText } = render(
			<FinishScreen
				dispatch={mockDispatch}
				userHighscore={result.current.state.userHighscore}
				userTotalPoints={result.current.state.userTotalPoints}
				maxPossiblePoints={maxPossiblePoints}
			/>
		);

		renderGetByTestId = getByTestId as RenderGetByTestIdType;
		renderGetByText = getByText as RenderGetByTextType;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(renderGetByTestId('result')).toBeInTheDocument();
		expect(renderGetByTestId('highscore')).toBeInTheDocument();
	});

	test('should render the user quiz results correctly with an empty questions array', () => {
		expect(renderGetByTestId('result')).toHaveTextContent('You scored 0 out of 0 (0%)');
		expect(renderGetByTestId('highscore')).toHaveTextContent('(Highscore: 0 points)');
	});

	test('should render the user quiz results correctly with an populated questions array', () => {
		const DUMMY_INITIAL_REACT_QUIZ_STATE: InitalReactQuizType = {
			questions: [
				{
					question: 'Which is the most popular JavaScript framework?',
					options: ['Angular', 'React', 'Svelte', 'Vue'],
					correctOption: 1,
					points: 10,
					id: 'e72d',
				},
				{
					question: 'Which company invented React?',
					options: ['Google', 'Apple', 'Netflix', 'Facebook'],
					correctOption: 3,
					points: 10,
					id: '9256',
				},
			],
			status: 'loading',
			questionIndex: 0,
			userAnswerIndex: null,
			userTotalPoints: 0,
			userHighscore: 0,
			quizTimeRemaining: null,
		};

		const { result } = renderHook(() => {
			const [state, dispatch] = useReducer(
				reactQuizReducer,
				DUMMY_INITIAL_REACT_QUIZ_STATE
			);
			return { state, dispatch };
		});

		const maxPossiblePoints: number = result.current.state.questions.reduce(
			(acc: number, curr: QuestionType) => curr.points + acc,
			0
		);

		const { getByTestId } = render(
			<FinishScreen
				dispatch={mockDispatch}
				userHighscore={result.current.state.userHighscore}
				userTotalPoints={result.current.state.userTotalPoints}
				maxPossiblePoints={maxPossiblePoints}
			/>
		);

		expect(getByTestId('result')).toHaveTextContent('You scored 0 out of 20 (0%)');
		expect(renderGetByTestId('highscore')).toHaveTextContent('(Highscore: 0 points)');
	});

	test('should render the StartScreen if the Reset Quiz button is clicked', () => {
		fireEvent.click(
			renderGetByText('Reset Quiz'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(mockDispatch).toHaveBeenCalled();
		expect(mockDispatch).toHaveBeenCalledOnce();
	});
});
