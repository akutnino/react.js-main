import {
	cleanup,
	fireEvent,
	render,
	type Matcher,
	type MatcherOptions,
	type SelectorMatcherOptions,
	type waitForOptions,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import App from '../../components/App.tsx';

type RenderGetByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement;

type RenderFindByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined,
	waitForElementOptions?: waitForOptions | undefined
) => Promise<HTMLElement>;

type RenderGetByTextType = (
	id: Matcher,
	options?: SelectorMatcherOptions | undefined
) => HTMLElement;

describe('App component test suite', () => {
	let renderGetByTestId: RenderGetByTestIdType;
	let renderFindByTestId: RenderFindByTestIdType;
	let renderGetByText: RenderGetByTextType;

	beforeEach(() => {
		const SECRET_URL: string = 'http://localhost:8000/questions';
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestNames: string[] = [
			'App component test suite > should render the ErrorMessage component if the status is error',
		];

		if (exemptedTestNames.includes(currentTestName)) return;

		const { getByTestId, getByText, findByTestId } = render(
			<App secretURL={SECRET_URL} />
		);

		renderGetByTestId = getByTestId as RenderGetByTestIdType;
		renderFindByTestId = findByTestId as RenderFindByTestIdType;
		renderGetByText = getByText as RenderGetByTextType;
	});

	afterEach(() => {
		cleanup();
	});

	test('should show all components in the DOM', () => {
		expect(renderGetByTestId('container')).toBeInTheDocument();
		expect(renderGetByTestId('container').firstElementChild).toHaveTextContent(
			'The React Quiz'
		);
	});

	test('should render the Loader component if the status is loading', async () => {
		await vi.waitFor(() => {
			expect(renderGetByTestId('loader')).toBeInTheDocument();
			expect(renderGetByTestId('loader')).toHaveTextContent('Loading questions...');
		});

		expect(await renderFindByTestId('loader', undefined, undefined)).toBeInTheDocument();
	});

	test('should render the StartScreen component if the status is ready', async () => {
		await vi.waitFor(async () => {
			expect(await renderFindByTestId('start')).toBeInTheDocument();
			expect((await renderFindByTestId('start')).firstElementChild).toHaveTextContent(
				'Welcome to The React Quiz!'
			);
		});

		expect(await renderFindByTestId('start', undefined, undefined)).toBeInTheDocument();
	});

	test('should render the Progress, Question, and Footer components if the status is active', async () => {
		expect(await renderFindByTestId('start', undefined, undefined)).toBeInTheDocument();
		expect(renderGetByTestId('start').firstElementChild).toHaveTextContent(
			'Welcome to The React Quiz!'
		);

		fireEvent.click(
			renderGetByText(`Let's Start`),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderGetByTestId('progress')).toBeInTheDocument();
		expect(renderGetByTestId('question')).toBeInTheDocument();
		expect(renderGetByTestId('footer')).toBeInTheDocument();
	});

	test('should render the FinishScreen component if the status is finished', async () => {
		expect(await renderFindByTestId('start', undefined, undefined)).toBeInTheDocument();

		fireEvent.click(
			renderGetByText(`Let's Start`),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderGetByTestId('options')).toBeInTheDocument();

		while (true) {
			fireEvent.click(
				renderGetByTestId('options').firstElementChild as HTMLElement,
				new MouseEvent('click', {
					bubbles: true,
					cancelable: true,
				})
			);

			const buttonTextContent = renderGetByTestId('footer').lastElementChild
				?.textContent as string;

			if (buttonTextContent === 'Finish Quiz') break;

			fireEvent.click(
				renderGetByText('Next'),
				new MouseEvent('click', {
					bubbles: true,
					cancelable: true,
				})
			);
		}

		fireEvent.click(
			renderGetByText('Finish Quiz'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(renderGetByTestId('result')).toBeInTheDocument();
		expect(renderGetByTestId('result')).toHaveTextContent(
			'You scored 50 out of 280 (18%)'
		);
		expect(renderGetByTestId('highscore')).toHaveTextContent('(Highscore: 50 points)');
	});

	test('should render the ErrorMessage component if the status is error', async () => {
		const DUMMY_SECRET_URL: string = 'http://localhost:8000/xyz';
		// const mocks = vi.hoisted(() => {
		// 	return {
		// 		default: { key: <App secretURL={DUMMY_SECRET_URL} /> },
		// 	};
		// });

		// vi.mock('../../components/App.tsx', () => {
		// 	return {
		// 		default: mocks.default,
		// 	};
		// });

		const { getByTestId, findByTestId } = render(<App secretURL={DUMMY_SECRET_URL} />);
		// const { getByTestId, getByText, findByTestId } = render(<App />);

		await vi.waitFor(() => {
			expect(getByTestId('loader')).toBeInTheDocument();
			expect(getByTestId('loader')).toHaveTextContent('Loading questions...');
			return;
			// vi.spyOn(globalThis, 'fetch').mockImplementation(() => {
			// 	throw new Error('Failed Fetch Request');
			// });
		});

		expect(await findByTestId('error')).toBeInTheDocument();
	});
});
