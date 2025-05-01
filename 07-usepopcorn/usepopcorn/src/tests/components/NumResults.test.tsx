import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { type MovieDataType } from '../../types/components/types.ts';
import NumResults from '../../components/NumResults.tsx';

describe('NumResults component test suite', () => {
	const EMPTY_MOVIES_ARRAY: MovieDataType[] = [];

	let numResultsElement: HTMLParagraphElement;
	let totalLengthElement: HTMLElement;

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestName = [
			'NumResults component test suite > should render the correct num result if the query is successful',
		];

		if (exemptedTestName.includes(currentTestName)) return;
		const { getByTestId } = render(<NumResults movies={EMPTY_MOVIES_ARRAY} />);

		numResultsElement = getByTestId('numResults') as HTMLParagraphElement;
		totalLengthElement = getByTestId('totalLength') as HTMLElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(numResultsElement).toBeInTheDocument();
	});

	test('should render num results as zero by default', () => {
		expect(totalLengthElement.innerHTML).toBe('0');
	});

	test('should render the correct num result if the query is successful', () => {
		const DUMMY_MOVIES_ARRAY: MovieDataType[] = [
			{
				imdbID: 'testID',
				Poster: 'testPoster',
				Type: 'testType',
				Title: 'testTitle',
				Year: 'testYear',
			},
		];

		const { getByTestId } = render(<NumResults movies={DUMMY_MOVIES_ARRAY} />);

		const totalLengthElement = getByTestId('totalLength') as HTMLElement;

		expect(totalLengthElement.innerHTML).toBe('1');
		expect(DUMMY_MOVIES_ARRAY).toHaveLength(1);
	});
});
