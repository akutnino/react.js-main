import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import StarRating from '../../components/StarRating.tsx';

describe('StarRating component test suite', () => {
	const DEFAULT_MAXRATING: number = 1;
	const DEFAULT_MESSAGES: string[] = [];

	let starRatingElement: HTMLDivElement;
	let starElement: HTMLSpanElement;
	let ratingElement: HTMLParagraphElement;

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestNames: string[] = [
			'StarRating component test suite > should render the correct message if the MESSAGES and MAXRATING are same length',
		];

		if (exemptedTestNames.includes(currentTestName)) return;

		const { getByTestId } = render(
			<StarRating
				maxRating={DEFAULT_MAXRATING}
				messages={DEFAULT_MESSAGES}
			/>
		);

		starRatingElement = getByTestId('starRating') as HTMLDivElement;
		starElement = getByTestId('star') as HTMLSpanElement;
		ratingElement = starRatingElement.lastElementChild as HTMLParagraphElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(starRatingElement).toBeInTheDocument();
		expect(starElement).toBeInTheDocument();
		expect(ratingElement).toBeInTheDocument();
	});

	test('should render the correct hover rating if the user hover the cursur to a star component', () => {
		expect(ratingElement.innerHTML).toBe('');

		fireEvent.mouseEnter(
			starElement,
			new MouseEvent('mouseenter', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(ratingElement.innerHTML).toBe('1');

		fireEvent.mouseLeave(
			starElement,
			new MouseEvent('mouseleave', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(ratingElement.innerHTML).toBe('');
	});

	test('should render the correct rating if the user clicks a star component', () => {
		expect(ratingElement.innerHTML).toBe('');

		fireEvent.mouseEnter(
			starElement,
			new MouseEvent('mouseenter', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(ratingElement.innerHTML).toBe('1');

		fireEvent.click(
			starElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		fireEvent.mouseLeave(
			starElement,
			new MouseEvent('mouseleave', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(ratingElement.innerHTML).toBe('1');
	});

	test('should render the correct message if the MESSAGES and MAXRATING are same length', () => {
		const DEFAULT_MAXRATING: number = 1;
		const DEFAULT_MESSAGES: string[] = ['1'];

		const { getByTestId } = render(
			<StarRating
				maxRating={DEFAULT_MAXRATING}
				messages={DEFAULT_MESSAGES}
			/>
		);

		const starRatingElement = getByTestId('starRating') as HTMLDivElement;
		const starElement = getByTestId('star') as HTMLSpanElement;
		const ratingElement = starRatingElement.lastElementChild as HTMLParagraphElement;

		expect(ratingElement.innerHTML).toBe('');

		fireEvent.click(
			starElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(ratingElement.innerHTML).toBe(DEFAULT_MESSAGES.at(0));
	});
});
