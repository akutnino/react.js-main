import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { type WatchedMovieDataType } from '../../types/components/types.ts';
import WatchedSummary from '../../components/WatchedSummary.tsx';

describe('WatchedSummary component test suite', () => {
	const EMPTY_WATCHED_ARRAY: WatchedMovieDataType[] = [];
	let watchedSummaryElement: HTMLDivElement;
	let totalWatchedElement: HTMLSpanElement;
	let avgImdbRatingElement: HTMLSpanElement;
	let avgUserRatingElement: HTMLSpanElement;
	let avgRuntimeElement: HTMLSpanElement;

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestNames: string[] = [
			'WatchedSummary component test suite > should render the correct watched summary stats if watchedMoviesList is not empty',
		];

		if (exemptedTestNames.includes(currentTestName)) return;

		const { getByTestId } = render(<WatchedSummary watched={EMPTY_WATCHED_ARRAY} />);

		watchedSummaryElement = getByTestId('watchedSummary') as HTMLDivElement;
		totalWatchedElement = getByTestId('totalWatched') as HTMLSpanElement;
		avgImdbRatingElement = getByTestId('avgImdbRating') as HTMLSpanElement;
		avgUserRatingElement = getByTestId('avgUserRating') as HTMLSpanElement;
		avgRuntimeElement = getByTestId('avgRuntime') as HTMLSpanElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(watchedSummaryElement).toBeInTheDocument();
		expect(totalWatchedElement).toBeInTheDocument();
		expect(avgImdbRatingElement).toBeInTheDocument();
		expect(avgUserRatingElement).toBeInTheDocument();
		expect(avgRuntimeElement).toBeInTheDocument();
	});

	test('should render watched summary stats as zero by default', () => {
		expect(totalWatchedElement.innerHTML.split(' ').at(0)).toBe('0');
		expect(avgImdbRatingElement.innerHTML).toBe('0.00');
		expect(avgUserRatingElement.innerHTML).toBe('0.00');
		expect(avgRuntimeElement.innerHTML.split(' ').at(0)).toBe('0');
	});

	test('should render the correct watched summary stats if watchedMoviesList is not empty', () => {
		const DUMMY_WATCHED_ARRAY: WatchedMovieDataType[] = [
			{
				Poster: 'test_Poster',
				Title: 'test_Title',
				Year: 'test_Year',
				countRatingDecisions: 1,
				imdbID: 'test_imdbID',
				imdbRating: 5,
				runtime: 100,
				userRating: 10,
			},
		];
		const { getByTestId } = render(<WatchedSummary watched={DUMMY_WATCHED_ARRAY} />);

		const totalWatchedElement = getByTestId('totalWatched') as HTMLSpanElement;
		const avgImdbRatingElement = getByTestId('avgImdbRating') as HTMLSpanElement;
		const avgUserRatingElement = getByTestId('avgUserRating') as HTMLSpanElement;
		const avgRuntimeElement = getByTestId('avgRuntime') as HTMLSpanElement;

		expect(totalWatchedElement.innerHTML.split(' ').at(0)).toBe('1');
		expect(avgImdbRatingElement.innerHTML).toBe('5.00');
		expect(avgUserRatingElement.innerHTML).toBe('10.00');
		expect(avgRuntimeElement.innerHTML.split(' ').at(0)).toBe('100');
	});
});
