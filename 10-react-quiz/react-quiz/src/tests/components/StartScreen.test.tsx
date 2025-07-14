import {
	cleanup,
	fireEvent,
	render,
	type Matcher,
	type MatcherOptions,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import StartScreen from '../../components/StartScreen.tsx';

type RenderGetByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement;

describe('StartScreen component test suite', () => {
	let renderGetByTestId: RenderGetByTestIdType;
	const mockDispatch = vi.fn();
	const DUMMY_TOTALQUESTIONS: number = 15;

	beforeEach(() => {
		const { getByTestId } = render(
			<StartScreen
				dispatch={mockDispatch}
				totalQuestions={DUMMY_TOTALQUESTIONS}
			/>
		);

		renderGetByTestId = getByTestId as RenderGetByTestIdType;
	});

	afterEach(() => {
		mockDispatch.mockClear();
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(renderGetByTestId('start')).toBeInTheDocument();
		expect(renderGetByTestId('start').children).toHaveLength(3);
	});

	test('should total questions value correctly', () => {
		expect(renderGetByTestId('start').firstElementChild).toHaveTextContent(
			'Welcome to The React Quiz!'
		);
		expect(renderGetByTestId('start').children[1]).toHaveTextContent(
			'15 questions to test your React mastery'
		);
		expect(renderGetByTestId('start').lastElementChild).toHaveTextContent(`Let's Start`);
	});

	test('should start the quiz if the Start button is clicked', () => {
		fireEvent.click(
			renderGetByTestId('start').lastElementChild as HTMLElement,
			new MouseEvent('click', {
				cancelable: true,
				bubbles: true,
			})
		);

		expect(mockDispatch).toHaveBeenCalledOnce();
	});
});
