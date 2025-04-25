import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, test } from 'vitest';
import WatchedSummary from '../../components/WatchedSummary.tsx';

describe('WatchedSummary component test suite', () => {
	let watchedSummaryElement: HTMLDivElement;
	let totalWatchedElement: HTMLSpanElement;
	let avgImdbRatingElement: HTMLSpanElement;
	let avgRuntimeElement: HTMLSpanElement;

	beforeEach(() => {
		const { getByTestId } = render(<WatchedSummary watched={[]} />);

		watchedSummaryElement = getByTestId('watchedSummary') as HTMLDivElement;
		totalWatchedElement = getByTestId('totalWatched') as HTMLSpanElement;
		avgImdbRatingElement = getByTestId('avgImdbRating') as HTMLSpanElement;
		avgRuntimeElement = getByTestId('avgRuntime') as HTMLSpanElement;
	});

	afterEach(() => {
		cleanup();
	});

	test.todo('should render the component correctly', () => {});

	test.todo('should render watched summary stats as zero by default', () => {
		// totalWatched, avgImdbRating, avgUserRating, and avgRuntime
	});

	// prettier-ignore
	test.todo('should render the correct watched summary stats if watchedMoviesList is not empty', () => {
		// totalWatched, avgImdbRating, avgUserRating, and avgRuntime
	});
});
