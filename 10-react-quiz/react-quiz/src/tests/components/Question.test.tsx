import {
	cleanup,
	render,
	type Matcher,
	type MatcherOptions,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import type { QuestionType, UserAnswerIndexType } from '../../types/components/types.ts';
import Question from '../../components/Question.tsx';

type RenderGetByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement;

describe('Question component test suite', () => {
	let renderGetByTestId: RenderGetByTestIdType;

	const mockDispatch = vi.fn();
	const DUMMY_USERANSWERINDEX: UserAnswerIndexType = null;
	const DUMMY_QUESTION: QuestionType = {
		question: 'Which is the most popular JavaScript framework?',
		options: ['Angular', 'React', 'Svelte', 'Vue'],
		correctOption: 1,
		points: 10,
		id: 'ae5d',
	};

	beforeEach(() => {
		const { getByTestId } = render(
			<Question
				dispatch={mockDispatch}
				question={DUMMY_QUESTION}
				userAnswerIndex={DUMMY_USERANSWERINDEX}
			/>
		);

		renderGetByTestId = getByTestId as RenderGetByTestIdType;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(renderGetByTestId('question')).toBeInTheDocument();
		expect(renderGetByTestId('options')).toBeInTheDocument();
	});

	test('should render the quiz question correctly', () => {
		expect(renderGetByTestId('question').firstElementChild).toHaveTextContent(
			DUMMY_QUESTION.question
		);
		expect(renderGetByTestId('question').lastElementChild).toHaveAttribute(
			'class',
			'options'
		);
	});
});
