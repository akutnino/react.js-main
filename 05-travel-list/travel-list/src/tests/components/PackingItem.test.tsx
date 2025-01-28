import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import App, { type ItemType } from '../../components/App.tsx';
import PackingItem from '../../components/PackingItem.tsx';

describe('App component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const dummyItem = [
			{
				id: 1,
				description: 'Passports',
				quantity: 2,
				packed: false,
			},
		];

		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>(dummyItem);
			return { items, setItems };
		});

		const { getByTestId } = render(
			<PackingItem
				item={result.current.items[0]}
				setItems={result.current.setItems}
			/>
		);

		expect(getByTestId('packing-item')).toBeInTheDocument();
		expect(getByTestId('checkbox-input')).toBeInTheDocument();
		expect(getByTestId('item-name')).toBeInTheDocument();
		expect(getByTestId('delete-btn')).toBeInTheDocument();
	});

	test('should render the component elements in order', () => {
		const dummyItem = [
			{
				id: 1,
				description: 'Passports',
				quantity: 2,
				packed: false,
			},
		];

		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>(dummyItem);
			return { items, setItems };
		});

		const { getByTestId, container } = render(
			<PackingItem
				item={result.current.items[0]}
				setItems={result.current.setItems}
			/>
		);

		const packingItemElement = container.firstElementChild;

		expect(getByTestId('checkbox-input')).toEqual(packingItemElement?.firstElementChild);
		expect(getByTestId('delete-btn')).toEqual(packingItemElement?.lastElementChild);
	});

	test('should update list item check state if user clicked the checkbox', () => {
		const dummyItem = [
			{
				id: 1,
				description: 'Passports',
				quantity: 2,
				packed: true,
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
			<PackingItem
				item={result.current.items[0]}
				setItems={result.current.setItems}
			/>
		);
		const checkboxElement = getByTestId('checkbox-input') as HTMLInputElement;

		fireEvent.click(
			checkboxElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		fireEvent.change(checkboxElement, {
			target: {
				checked: true,
			},
		});

		expect(checkboxElement.checked).toBe(true);
	});

	test('should delete list item if user clicked the checkbox', () => {
		const { getByTestId, queryAllByTestId } = render(<App />);
		const inputElement = getByTestId('form-input') as HTMLInputElement;
		const submitButton = getByTestId('form-submit') as HTMLButtonElement;

		fireEvent.change(inputElement, {
			target: { value: 'test' },
		});

		fireEvent.click(
			submitButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		const deleteButton = getByTestId('delete-btn') as HTMLButtonElement;

		fireEvent.click(
			deleteButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(queryAllByTestId('packing-item')).toHaveLength(0);
	});
});
