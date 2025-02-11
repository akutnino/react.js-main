import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { type ItemType } from '../../components/App.tsx';
import PackingItem from '../../components/PackingItem.tsx';

describe('PackingItem component test suite', () => {
	let packingItemElement: Element | null;
	let listItemElement: HTMLLIElement;
	let checkboxInputElement: HTMLInputElement;
	let itemNameSpanElement: HTMLSpanElement;
	let deleteButtonElement: HTMLButtonElement;
	let sutResult: {
		current: {
			items: ItemType[];
			setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
		};
	};

	beforeEach(() => {
		const dummyItemsArray: ItemType[] = [
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
			const [items, setItems] = useState<ItemType[]>(dummyItemsArray);
			return { items, setItems };
		});

		const { getByTestId, container } = render(
			<PackingItem
				item={result.current.items[0]}
				setItems={result.current.setItems}
			/>
		);

		sutResult = result;
		packingItemElement = container.firstElementChild;
		listItemElement = getByTestId('packing-item') as HTMLLIElement;
		checkboxInputElement = getByTestId('checkbox-input') as HTMLInputElement;
		itemNameSpanElement = getByTestId('item-name') as HTMLSpanElement;
		deleteButtonElement = getByTestId('delete-btn') as HTMLButtonElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(listItemElement).toBeInTheDocument();
		expect(checkboxInputElement).toBeInTheDocument();
		expect(itemNameSpanElement).toBeInTheDocument();
		expect(deleteButtonElement).toBeInTheDocument();
	});

	test('should render the component elements in order', () => {
		expect(checkboxInputElement).toEqual(packingItemElement?.firstElementChild);
		expect(deleteButtonElement).toEqual(packingItemElement?.lastElementChild);
	});

	test('should update list item check state if user clicked the checkbox', () => {
		fireEvent.click(
			checkboxInputElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		fireEvent.change(checkboxInputElement, {
			target: {
				checked: true,
			},
		});

		expect(checkboxInputElement.checked).toBe(true);
	});

	test('should delete list item if user clicked the delete button', () => {
		fireEvent.click(
			deleteButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(sutResult.current.items).toHaveLength(1);
	});
});
