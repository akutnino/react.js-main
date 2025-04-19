import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { type MovieDataType } from '../../types/components/types.ts';
import NumResults from '../../components/NumResults.tsx';

describe('NumResults component test suite', () => {
	let numResultsElement: HTMLParagraphElement;
	let totalLengthElement: HTMLElement;

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestName = [
			'NumResults component test suite > should render the correct num result if the query is successful',
		];

		if (exemptedTestName.includes(currentTestName)) return;
		const { getByTestId } = render(<NumResults movies={[]} />);

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
		const dummyMoviesArray: MovieDataType[] = [
			{
				imdbID: 'testID',
				Poster: 'testPoster',
				Title: 'testTitle',
				Year: 'testYear',
			},
		];

		const { getByTestId } = render(<NumResults movies={dummyMoviesArray} />);

		const totalLengthElement = getByTestId('totalLength') as HTMLElement;

		expect(totalLengthElement.innerHTML).toBe('1');
		expect(dummyMoviesArray).toHaveLength(1);
	});
});
