import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { useState } from 'react';
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

	test('should update isOpen boolean state when close button is clicked', () => {
		const { getByTestId, container } = render(<App />);
		const closeButton = container.firstElementChild as Element;

		const { result } = renderHook(() => {
			const [isOpen, setIsOpen] = useState<boolean>(true);
			return { isOpen, setIsOpen };
		});

		const handleOpenMock = () => {
			result.current.setIsOpen(!result.current.isOpen);
		};

		closeButton.addEventListener('click', handleOpenMock);

		fireEvent(
			getByTestId('close'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(closeButton).toBeInTheDocument();
		expect(result.current.isOpen).toBe(false);
		expect(getByTestId('close')).toEqual(container.lastElementChild);
	});

	test('should remove the steps component if isOpen boolean state is false', () => {});

	test('should increase step count if next button is clicked', () => {});

	test('should decrease step count if previous button is clicked', () => {});
});
