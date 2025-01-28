import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import App from '../../components/App.tsx';

describe('App component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { getByTestId, container } = render(<App />);

		expect(getByTestId('close')).toEqual(container.firstElementChild);
		expect(getByTestId('steps')).toEqual(container.lastElementChild);
	});

	test('should render the steps element by default', () => {
		const { getByTestId } = render(<App />);

		expect(getByTestId('close')).toBeInTheDocument();
		expect(getByTestId('steps')).toBeInTheDocument();
	});

	test('should update isOpen boolean state and remove the steps component if close button is clicked', () => {
		const { getByTestId, container } = render(<App />);
		const closeButton = getByTestId('close') as HTMLButtonElement;

		fireEvent.click(
			closeButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(closeButton).toBeInTheDocument();
		expect(closeButton).toEqual(container.lastElementChild);
		expect(container.childElementCount).toBe(1);
	});

	test('should both increase and decrease step count if the buttons are clicked', () => {
		const { getByTestId } = render(<App />);
		const nextButton = getByTestId('buttons').lastElementChild as HTMLButtonElement;
		const previousButton = getByTestId('buttons').firstElementChild as HTMLButtonElement;
		const pElement = getByTestId('message') as HTMLParagraphElement;

		fireEvent.click(
			nextButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		fireEvent.click(
			nextButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		fireEvent.click(
			nextButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		fireEvent.click(
			previousButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		fireEvent.click(
			previousButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		fireEvent.click(
			previousButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(getByTestId('buttons')).toBeInTheDocument();
		expect(previousButton).toBeInTheDocument();
		expect(nextButton).toBeInTheDocument();
		expect(pElement.innerHTML).toBe('<h3>Step: 1</h3>Start Learning React ⚛️');
	});
});
