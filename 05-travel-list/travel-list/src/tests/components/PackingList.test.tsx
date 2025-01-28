import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import App, { ItemType } from '../../components/App.tsx';
import PackingList from '../../components/PackingList.tsx';

describe('App component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>([]);
			return { items, setItems };
		});

		const { getByTestId } = render(
			<PackingList
				items={result.current.items}
				setItems={result.current.setItems}
			/>
		);

		expect(getByTestId('packingList')).toBeInTheDocument();
		expect(getByTestId('packing-list')).toBeInTheDocument();
		expect(getByTestId('actions-div')).toBeInTheDocument();
		expect(getByTestId('actions-select')).toBeInTheDocument();
		expect(getByTestId('clear-btn')).toBeInTheDocument();
	});

	test('should render the component elements in order', () => {
		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>([]);
			return { items, setItems };
		});

		const { getByTestId, container } = render(
			<PackingList
				items={result.current.items}
				setItems={result.current.setItems}
			/>
		);

		const packingListElement = container.firstElementChild;

		expect(getByTestId('packing-list')).toEqual(packingListElement?.firstElementChild);
		expect(getByTestId('actions-div')).toEqual(packingListElement?.lastElementChild);
	});

	test('should render the select element value to description if user clicked the option', () => {
		const dummyItem = [
			{
				id: 1,
				description: 'Passports',
				quantity: 2,
				packed: false,
			},
			{
				id: 2,
				description: 'Socks',
				quantity: 12,
				packed: false,
			},
		];

		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>(dummyItem);
			return { items, setItems };
		});

		const { getByTestId } = render(
			<PackingList
				items={result.current.items}
				setItems={result.current.setItems}
			/>
		);
		const selectElement = getByTestId('actions-select') as HTMLSelectElement;

		fireEvent.change(selectElement, {
			target: {
				value: 'description',
			},
		});

		expect(selectElement.value).toBe('description');
	});

	test('should render the select element value to packed if user clicked the option', () => {
		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>([]);
			return { items, setItems };
		});

		const { getByTestId } = render(
			<PackingList
				items={result.current.items}
				setItems={result.current.setItems}
			/>
		);
		const selectElement = getByTestId('actions-select') as HTMLSelectElement;

		fireEvent.change(selectElement, {
			target: {
				value: 'packed',
			},
		});

		expect(selectElement.value).toBe('packed');
	});

	test('should clear the list if user clicked the clear button', () => {
		const { getByTestId, queryAllByTestId } = render(<App />);
		const buttonElement = getByTestId('clear-btn') as HTMLButtonElement;
		window.confirm = vi.fn(() => true);

		fireEvent.click(
			buttonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(window.confirm).toBeCalled();
		expect(queryAllByTestId('packing-item')).toHaveLength(0);
	});
});
