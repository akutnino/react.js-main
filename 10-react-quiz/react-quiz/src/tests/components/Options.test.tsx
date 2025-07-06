import {
	cleanup,
	fireEvent,
	render,
	type Matcher,
	type MatcherOptions,
	type SelectorMatcherOptions,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import type { UserAnswerIndexType } from '../../types/components/types.ts';
import Options from '../../components/Options.tsx';

type RenderGetByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement;

type RenderGetByTextType = (
	id: Matcher,
	options?: SelectorMatcherOptions | undefined
) => HTMLElement;

type RenderRerenderType = (ui: React.ReactNode) => void;

describe('Options component test suite', () => {
	let renderGetByTestId: RenderGetByTestIdType;
	let renderGetByText: RenderGetByTextType;
	let renderRerender: RenderRerenderType;
	const mockDispatch = vi.fn();

	const DUMMY_CORRECTOPTION: number = 1;
	const DUMMY_OPTIONS: string[] = ['Angular', 'React', 'Svelte', 'Vue'];
	const DUMMY_USERANSWERINDEX: UserAnswerIndexType = null;

	beforeEach(() => {
		const { getByTestId, getByText, rerender } = render(
			<Options
				correctOption={DUMMY_CORRECTOPTION}
				dispatch={mockDispatch}
				options={DUMMY_OPTIONS}
				userAnswerIndex={DUMMY_USERANSWERINDEX}
			/>
		);

		renderGetByTestId = getByTestId as RenderGetByTestIdType;
		renderGetByText = getByText as RenderGetByTextType;
		renderRerender = rerender as RenderRerenderType;
	});

	afterEach(() => {
		mockDispatch.mockClear();
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(renderGetByTestId('options')).toBeInTheDocument();
		expect(renderGetByText('Angular')).toBeInTheDocument();
		expect(renderGetByText('React')).toBeInTheDocument();
		expect(renderGetByText('Svelte')).toBeInTheDocument();
		expect(renderGetByText('Vue')).toBeInTheDocument();
	});

	test('should check if the button is disabled if the user has chosen an answer', () => {
		expect(renderGetByText('React')).not.toBeDisabled();

		fireEvent.click(
			renderGetByText('React'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(mockDispatch).toHaveBeenCalledOnce();

		const DUMMY_USERANSWERINDEX_UPDATED: number = 1;
		renderRerender(
			<Options
				correctOption={DUMMY_CORRECTOPTION}
				dispatch={mockDispatch}
				options={DUMMY_OPTIONS}
				userAnswerIndex={DUMMY_USERANSWERINDEX_UPDATED}
			/>
		);

		expect(renderGetByText('React')).toBeDisabled();
	});

	test('should render the option values correctly', () => {
		expect(renderGetByTestId('options').firstElementChild).toHaveTextContent('Angular');
		expect(renderGetByTestId('options').children[1]).toHaveTextContent('React');
		expect(renderGetByTestId('options').children[2]).toHaveTextContent('Svelte');
		expect(renderGetByTestId('options').children[3]).toHaveTextContent('Vue');
	});
});
