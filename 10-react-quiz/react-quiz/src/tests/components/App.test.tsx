import {
	cleanup,
	render,
	type Matcher,
	type MatcherOptions,
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

describe('App component test suite', () => {
	let renderGetByTestId: RenderGetByTestIdType;
	let renderFindByTestId: RenderFindByTestIdType;

	beforeEach(() => {
		const { getByTestId, findByTestId } = render(<App />);

		renderGetByTestId = getByTestId as RenderGetByTestIdType;
		renderFindByTestId = findByTestId as RenderFindByTestIdType;
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
		});

		// expect(await renderFindByTestId('', {}));
	});

	test('should render the StartScreen component if the status is ready', async () => {
		await vi.waitFor(() => {
			expect(renderGetByTestId('start')).toBeInTheDocument();
		});
	});

	test.todo(
		'should render the Progress, Question, and Footer components if the status is active',
		() => {}
	);
	test.todo(
		'should render the FinishScreen component if the status is finished',
		() => {}
	);
	test.todo('should render the ErrorMessage component if the status is error', () => {});
});
