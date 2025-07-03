import {
	cleanup,
	fireEvent,
	render,
	type Matcher,
	type MatcherOptions,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import Button from '../../components/Button.tsx';

type RenderGetByTestIdType = (
	id: Matcher,
	options?: MatcherOptions | undefined
) => HTMLElement;

describe('Button component test suite', () => {
	let renderGetByTestId: RenderGetByTestIdType;
	const mockOnClick = vi.fn();

	beforeEach(() => {
		const { getByTestId } = render(<Button onClick={mockOnClick}>Click</Button>);
		renderGetByTestId = getByTestId as RenderGetByTestIdType;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(renderGetByTestId('button')).toBeInTheDocument();
		expect(renderGetByTestId('button')).toHaveTextContent('Click');
	});

	test('should check if the children is mounted by defualt', () => {
		expect(renderGetByTestId('button').innerHTML).toBeTruthy();
		expect(renderGetByTestId('button').innerHTML).toBe('Click');
	});

	test('should check if the callback is called when the button was clicked', () => {
		fireEvent.click(
			renderGetByTestId('button'),
			new MouseEvent('click', {
				cancelable: true,
				bubbles: true,
			})
		);

		expect(mockOnClick).toHaveBeenCalledOnce();
	});
});
