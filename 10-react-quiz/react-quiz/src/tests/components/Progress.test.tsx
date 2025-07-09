import {
	cleanup,
	render,
	type Matcher,
	type MatcherOptions,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import type { UserAnswerIndexType } from '../../types/components/types.ts';
import Progress from '../../components/Progress.tsx';

type RenderGetByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement;

describe('Progress component test suite', () => {
	let renderGetByTestId: RenderGetByTestIdType;

	const DUMMY_MAXPOSSIBLEPOINTS: number = 280;
	const DUMMY_QUESTIONINDEX: number = 0;
	const DUMMY_TOTALQUESTIONS: number = 15;
	const DUMMY_USERTOTALPOINTS: number = 0;
	const DUMMY_USERANSWERINDEX: UserAnswerIndexType = null;

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const excludedTestNames: string[] = [
			'Progress component test suite > should render the correct progressValue with userAnswerIndex as a number',
		];

		if (excludedTestNames.includes(currentTestName)) return;
		const { getByTestId } = render(
			<Progress
				maxPossiblePoints={DUMMY_MAXPOSSIBLEPOINTS}
				questionIndex={DUMMY_QUESTIONINDEX}
				totalQuestions={DUMMY_TOTALQUESTIONS}
				userTotalPoints={DUMMY_USERTOTALPOINTS}
				userAnswerIndex={DUMMY_USERANSWERINDEX}
			/>
		);

		renderGetByTestId = getByTestId as RenderGetByTestIdType;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(renderGetByTestId('progress')).toBeInTheDocument();
	});

	test('should render the correct progress values', () => {
		expect(renderGetByTestId('progress').firstElementChild).toHaveAttribute(
			'max',
			`${DUMMY_TOTALQUESTIONS}`
		);
		expect(renderGetByTestId('progress').firstElementChild).toHaveAttribute('value', '0');
		expect(renderGetByTestId('progress').children[1]).toHaveTextContent(
			'Question 1 / 15'
		);
		expect(renderGetByTestId('progress').lastElementChild).toHaveTextContent('0 / 280');
	});

	test('should render the correct progressValue with userAnswerIndex as a number', () => {
		const DUMMY_USERANSWERINDEX_UPDATED: number = 1;

		const { getByTestId } = render(
			<Progress
				maxPossiblePoints={DUMMY_MAXPOSSIBLEPOINTS}
				questionIndex={DUMMY_QUESTIONINDEX}
				totalQuestions={DUMMY_TOTALQUESTIONS}
				userTotalPoints={DUMMY_USERTOTALPOINTS}
				userAnswerIndex={DUMMY_USERANSWERINDEX_UPDATED}
			/>
		);

		expect(getByTestId('progress').firstElementChild).toHaveAttribute(
			'value',
			`${DUMMY_USERANSWERINDEX_UPDATED}`
		);
	});
});
