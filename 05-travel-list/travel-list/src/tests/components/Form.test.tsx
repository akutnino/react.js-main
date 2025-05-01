import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { type ItemType } from '../../components/App.tsx';
import Form from '../../components/Form.tsx';

type RenderHookResultType = {
	current: {
		items: ItemType[];
		setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
	};
};

describe('Form component test suite', () => {
	let formElement: Element | null;
	let formHeading3Element: HTMLHeadingElement;
	let formSelectElement: HTMLSelectElement;
	let formInputElement: HTMLInputElement;
	let formSubmitElement: HTMLButtonElement;
	let renderHookResult: RenderHookResultType;

	beforeEach(() => {
		const { result } = renderHook(() => {
			const [items, setItems] = useState<ItemType[]>([]);
			return { items, setItems };
		});

		const { getByTestId, container } = render(
			<Form setItems={result.current.setItems} />
		);

		renderHookResult = result as RenderHookResultType;
		formElement = container.firstElementChild;
		formHeading3Element = getByTestId('form-h3') as HTMLHeadingElement;
		formSelectElement = getByTestId('form-select') as HTMLSelectElement;
		formInputElement = getByTestId('form-input') as HTMLInputElement;
		formSubmitElement = getByTestId('form-submit') as HTMLButtonElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(formHeading3Element).toBeInTheDocument();
		expect(formSelectElement).toBeInTheDocument();
		expect(formInputElement).toBeInTheDocument();
		expect(formSubmitElement).toBeInTheDocument();
	});

	test('should render the component elements in order', () => {
		expect(formHeading3Element).toEqual(formElement?.firstElementChild);
		expect(formSelectElement).toEqual(formElement?.children[1]);
		expect(formInputElement).toEqual(formElement?.children[2]);
		expect(formSubmitElement).toEqual(formElement?.lastElementChild);
	});

	test('should render the correct value of select item if user clicked an option', () => {
		// Simulating the user event to the formSelectElement.
		fireEvent.change(formSelectElement, {
			target: { value: 10 },
		});

		expect(formSelectElement.value).toBe('10');
	});

	test('should render correct value if user enters an input', () => {
		// Simulating the user event to the formInputElement.
		fireEvent.change(formInputElement, {
			target: { value: 'testing' },
		});

		expect(formInputElement.value).toEqual('testing');
	});

	test('should exit the submit mock if the description state is falsy ', () => {
		// Simulating the user event to the formSubmitElement.
		fireEvent.click(
			formSubmitElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(formInputElement.value).toEqual('');
		expect(renderHookResult.current.items).toHaveLength(0);
	});

	test('should render correct changes in DOM when user clicks Add button ', () => {
		// Simulating the user events to the formElement.
		fireEvent.change(formInputElement, {
			target: { value: 'test' },
		});

		fireEvent.click(
			formSubmitElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(formInputElement.value).toEqual('');
		expect(renderHookResult.current.items).toHaveLength(1);
	});
});
