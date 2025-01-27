import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import App, { type ItemType } from '../../components/App.tsx';
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
			return { items, setItems };
		});

		const { getByTestId } = render(<Form setItems={result.current.setItems} />);
		const selectElement = getByTestId('form-select') as HTMLSelectElement;

		fireEvent.change(selectElement, {
			target: { value: 10 },
		});

		expect(selectElement.value).toBe('10');
	});

	test('should render correct value if user enters an input', () => {
		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>([]);
			return { items, setItems };
		});

		const { getByTestId } = render(<Form setItems={result.current.setItems} />);
		const inputElement = getByTestId('form-input') as HTMLInputElement;

		fireEvent.change(inputElement, {
			target: { value: 'testing' },
		});

		expect(inputElement.value).toEqual('testing');
	});

	test('should exit the submit mock if the description state is falsy ', () => {
		const { getByTestId, queryAllByTestId } = render(<App />);
		const inputElement = getByTestId('form-input') as HTMLInputElement;
		const buttonElement = getByTestId('form-submit') as HTMLButtonElement;

		fireEvent.click(
			buttonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(inputElement.value).toEqual('');
		expect(queryAllByTestId('packing-item')).toHaveLength(0);
	});

	test('should render correct changes in DOM when user clicks Add button ', () => {
		const { getByTestId, queryAllByTestId } = render(<App />);
		const inputElement = getByTestId('form-input') as HTMLInputElement;
		const buttonElement = getByTestId('form-submit') as HTMLButtonElement;

		fireEvent.change(inputElement, {
			target: { value: 'test' },
		});

		fireEvent.click(
			buttonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(inputElement.value).toEqual('');
		expect(queryAllByTestId('packing-item')).toHaveLength(1);
	});
});
