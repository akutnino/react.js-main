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
		const { getByTestId, getByText, findByTestId } = render(<App />);

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

	test.todo(
		'should render the FinishScreen component if the status is finished',
		() => {}
	);

	test.todo('should render the ErrorMessage component if the status is error', () => {});
});
