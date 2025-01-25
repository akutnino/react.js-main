import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { type ItemType } from '../../components/App.tsx';
import Form from '../../components/Form.tsx';

describe('App component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>([]);
			return { items, setItems };
		});

		const { getByTestId } = render(<Form setItems={result.current.setItems} />);

		expect(getByTestId('form-h3')).toBeInTheDocument();
		expect(getByTestId('form-select')).toBeInTheDocument();
		expect(getByTestId('form-input')).toBeInTheDocument();
		expect(getByTestId('form-submit')).toBeInTheDocument();
	});

	test('should render the component elements in order', () => {
		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>([]);
			return { items, setItems };
		});

		const { getByTestId, container } = render(
			<Form setItems={result.current.setItems} />
		);

		const formElement = container.firstElementChild;

		expect(getByTestId('form-h3')).toEqual(formElement?.firstElementChild);
		expect(getByTestId('form-select')).toEqual(formElement?.children[1]);
		expect(getByTestId('form-input')).toEqual(formElement?.children[2]);
		expect(getByTestId('form-submit')).toEqual(formElement?.lastElementChild);
	});

	test('should render the correct value of select item if user clicked an option', () => {
		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>([]);
			const [quantity, setQuantity] = useState<number>(1);

			return {
				items,
				quantity,
				setItems,
				setQuantity,
			};
		});

		const { getByTestId } = render(<Form setItems={result.current.setItems} />);
		let timesCalled: number = 0;

		const handleSelectMock = (event: ChangeEvent<HTMLSelectElement>) => {
			result.current.setQuantity(Number(event.currentTarget.value));
			timesCalled++;
		};

		getByTestId('form-select').addEventListener('change', handleSelectMock as () => void);

		fireEvent.change(getByTestId('form-select'), {
			target: { value: 5 },
		});

		expect(result.current.quantity).toEqual(5);
		expect(timesCalled).toBe(1);
	});

	test('should render correct value if user enters an input', () => {
		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>([]);
			const [description, setDescription] = useState<string>('');

			return {
				items,
				description,
				setItems,
				setDescription,
			};
		});

		const { getByTestId } = render(<Form setItems={result.current.setItems} />);
		let timesCalled: number = 0;

		const handleInputMock = (event: ChangeEvent<HTMLInputElement>) => {
			result.current.setDescription(event.currentTarget.value);
			timesCalled++;
		};

		getByTestId('form-input').addEventListener('change', handleInputMock as () => void);

		fireEvent.change(getByTestId('form-input'), {
			target: { value: 'test' },
		});

		expect(result.current.description).toEqual('test');
		expect(timesCalled).toBe(1);
	});

	test('should exit the submit mock if the description state is falsy ', () => {
		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>([]);
			const [description, setDescription] = useState<string>('');
			const [quantity, setQuantity] = useState<number>(1);

			return {
				items,
				description,
				quantity,
				setItems,
				setDescription,
				setQuantity,
			};
		});

		const { getByTestId } = render(<Form setItems={result.current.setItems} />);
		let mockFnIsCalled;
		let mockFnReturned = true;

		const handleSubmitMock = (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			mockFnIsCalled = true;
			if (!result.current.description) return;
			mockFnReturned = false;

			const newItem: ItemType = {
				id: Date.now(),
				description: result.current.description,
				quantity: result.current.quantity,
				packed: false,
			};

			result.current.setItems((currentItems) => [...currentItems, newItem]);
			result.current.setDescription('');
			result.current.setQuantity(1);
		};

		getByTestId('form').addEventListener('submit', handleSubmitMock as () => void);

		fireEvent.click(
			getByTestId('form-submit'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(result.current.items).toEqual([]);
		expect(result.current.description).toEqual('');
		expect(result.current.quantity).toEqual(1);
		expect(mockFnIsCalled).toBe(true);
		expect(mockFnReturned).toBe(true);
	});

	test('should render correct changes in DOM when user clicks Add button ', () => {
		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>([]);
			const [description, setDescription] = useState<string>('');
			const [quantity, setQuantity] = useState<number>(1);

			return {
				items,
				description,
				quantity,
				setItems,
				setDescription,
				setQuantity,
			};
		});

		const { getByTestId } = render(<Form setItems={result.current.setItems} />);
		let inputMockFnIsCalled: number = 0;
		let submitMockFnIsCalled: number = 0;

		const handleInputMock = (event: ChangeEvent<HTMLInputElement>) => {
			result.current.setDescription(event.currentTarget.value);
			inputMockFnIsCalled++;
		};

		const handleSubmitMock = (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			if (!result.current.description) return;

			const newItem: ItemType = {
				id: 1,
				description: result.current.description,
				quantity: result.current.quantity,
				packed: false,
			};

			result.current.setItems((currentItem) => [...currentItem, newItem]);
			result.current.setDescription('');
			result.current.setQuantity(1);
			submitMockFnIsCalled++;
		};

		getByTestId('form-input').addEventListener('change', handleInputMock as () => void);
		getByTestId('form').addEventListener('submit', handleSubmitMock as () => void);

		fireEvent.change(getByTestId('form-input'), {
			target: { value: 'test' },
		});

		fireEvent.click(
			getByTestId('form-submit'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		console.log(result.current.items);

		expect(result.current.items.length).toEqual(1);
		expect(result.current.description).toEqual('');
		expect(result.current.quantity).toEqual(1);
		expect(inputMockFnIsCalled).toBe(1);
		expect(submitMockFnIsCalled).toBe(1);
	});
});
