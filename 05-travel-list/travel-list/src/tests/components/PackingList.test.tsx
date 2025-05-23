import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { type ItemType } from '../../components/App.tsx';
import PackingList from '../../components/PackingList.tsx';

type RenderHookResultType = {
	current: {
		items: ItemType[];
		setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
	};
};

describe('PackingList component test suite', () => {
	const DUMMY_ITEMS_ARRAY: ItemType[] = [
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
			packed: true,
		},
	];

	let packingListElement: Element | null;
	let packingListDivElement: HTMLDivElement;
	let packingListULElement: HTMLUListElement;
	let actionsDivElement: HTMLDivElement;
	let actionsSelectElement: HTMLSelectElement;
	let clearButtonElement: HTMLButtonElement;
	let renderHookResult: RenderHookResultType;

	beforeEach(() => {
		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>(DUMMY_ITEMS_ARRAY);
			return { items, setItems };
		});

		const { getByTestId, container } = render(
			<PackingList
				items={result.current.items}
				setItems={result.current.setItems}
			/>
		);

		renderHookResult = result as RenderHookResultType;
		packingListElement = container.firstElementChild;
		packingListDivElement = getByTestId('packingList') as HTMLDivElement;
		packingListULElement = getByTestId('packing-list') as HTMLUListElement;
		actionsDivElement = getByTestId('actions-div') as HTMLDivElement;
		actionsSelectElement = getByTestId('actions-select') as HTMLSelectElement;
		clearButtonElement = getByTestId('clear-btn') as HTMLButtonElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(packingListDivElement).toBeInTheDocument();
		expect(packingListULElement).toBeInTheDocument();
		expect(actionsDivElement).toBeInTheDocument();
		expect(actionsSelectElement).toBeInTheDocument();
		expect(clearButtonElement).toBeInTheDocument();
	});

	test('should render the component elements in order', () => {
		expect(packingListULElement).toEqual(packingListElement?.firstElementChild);
		expect(actionsDivElement).toEqual(packingListElement?.lastElementChild);
	});

	test('should render the select element value to description if user clicked the option', () => {
		// Simulating the user event to the actionsSelectElement.
		fireEvent.change(actionsSelectElement, {
			target: {
				value: 'description',
			},
		});

		expect(actionsSelectElement.value).toBe('description');
	});

	test('should render the select element value to packed if user clicked the option', () => {
		// Simulating the user event to the actionsSelectElement.
		fireEvent.change(actionsSelectElement, {
			target: {
				value: 'packed',
			},
		});

		expect(actionsSelectElement.value).toBe('packed');
	});

	test('should clear the list if user clicked the clear button', () => {
		window.confirm = vi.fn(() => true);

		// Simulating the user event to the clearButtonElement.
		fireEvent.click(
			clearButtonElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(window.confirm).toBeCalled();
		expect(renderHookResult.current.items).toHaveLength(0);
	});
});
