import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import Button from '../components/Button.tsx';

describe('Button component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const handleOnClick = vi.fn();
		const { getByTestId } = render(<Button onClick={handleOnClick}>Sample</Button>);
		const buttonElement = getByTestId('button') as HTMLButtonElement;

		fireEvent.click(
			buttonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(buttonElement).toBeInTheDocument();
		expect(handleOnClick).toHaveBeenCalledOnce();
	});
});
