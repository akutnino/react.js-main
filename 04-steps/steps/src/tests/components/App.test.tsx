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

		fireEvent.click(
			getByTestId('close'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(closeButton).toBeInTheDocument();
		expect(result.current.isOpen).toBe(false);
		expect(closeButton).toEqual(container.lastElementChild);
	});

	test('should remove the steps component if isOpen boolean state is false', () => {
		const { getByTestId, container } = render(<App />);
		const closeButton = container.firstElementChild as HTMLElement;

		const { result } = renderHook(() => {
			const [isOpen, setIsOpen] = useState<boolean>(true);
			return { isOpen, setIsOpen };
		});

		const handleOpenMock = () => {
			result.current.setIsOpen(!result.current.isOpen);
		};

		closeButton.addEventListener('click', handleOpenMock);

		fireEvent.click(
			getByTestId('close'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(closeButton).toBeInTheDocument();
		expect(result.current.isOpen).toBe(false);
		expect(closeButton).toEqual(container.lastElementChild);
		expect(container.childElementCount).toBe(1);
	});

	test('should increase step count if next button is clicked', () => {
		const { getByTestId } = render(<App />);
		const nextButton = getByTestId('buttons').lastElementChild as HTMLElement;
		let timesCalled: number = 0;

		const { result } = renderHook(() => {
			const [step, setStep] = useState<number>(1);
			return { step, setStep };
		});

		const handleNextMock = () => {
			result.current.setStep((currentStep) => (currentStep < 3 ? currentStep + 1 : 3));
			timesCalled++;
		};

		nextButton.addEventListener('click', handleNextMock);

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

		expect(getByTestId('buttons')).toBeInTheDocument();
		expect(nextButton).toBeInTheDocument();
		expect(result.current.step).toBe(3);
		expect(timesCalled).toBe(3);
	});

	test('should decrease step count if previous button is clicked', () => {
		const { getByTestId } = render(<App />);
		const previousButton = getByTestId('buttons').firstElementChild as HTMLElement;
		let timesCalled: number = 0;

		const { result } = renderHook(() => {
			const [step, setStep] = useState<number>(3);
			return { step, setStep };
		});

		const handlePreviousMock = () => {
			result.current.setStep((currentStep) => (currentStep > 1 ? currentStep - 1 : 1));
			timesCalled++;
		};

		previousButton.addEventListener('click', handlePreviousMock);

		fireEvent.click(
			previousButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(getByTestId('buttons')).toBeInTheDocument();
		expect(previousButton).toBeInTheDocument();
		expect(result.current.step).toBe(2);
		expect(timesCalled).toBe(1);
	});

	test('should both increase and decrease step count if the buttons are clicked', () => {
		const { getByTestId } = render(<App />);
		const nextButton = getByTestId('buttons').lastElementChild as HTMLElement;
		const previousButton = getByTestId('buttons').firstElementChild as HTMLElement;
		let timesCalled: number = 0;

		const { result } = renderHook(() => {
			const [step, setStep] = useState<number>(1);
			return { step, setStep };
		});

		const handlePreviousMock = () => {
			timesCalled++;
			result.current.setStep((currentStep) => (currentStep > 1 ? currentStep - 1 : 1));
		};

		const handleNextMock = () => {
			timesCalled++;
			result.current.setStep((currentStep) => (currentStep < 3 ? currentStep + 1 : 3));
		};

		previousButton.addEventListener('click', handlePreviousMock);
		nextButton.addEventListener('click', handleNextMock);

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
		expect(result.current.step).toBe(1);
		expect(timesCalled).toBe(6);
	});
});
