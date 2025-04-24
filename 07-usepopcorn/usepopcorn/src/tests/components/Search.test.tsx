import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { useState } from 'react';
import Search from '../../components/Search.tsx';

describe('Search component test suite', () => {
	let searchElement: HTMLInputElement;

	beforeEach(() => {
		const { result } = renderHook(() => {
			const [query, setQuery] = useState<string>('');
			return { query, setQuery };
		});

		const { getByTestId } = render(
			<Search
				query={result.current.query}
				setQuery={result.current.setQuery}
			/>
		);

		searchElement = getByTestId('search') as HTMLInputElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(searchElement).toBeInTheDocument();
	});

	test('should render the correct value if the user enters an input', () => {
		// Simulating the user event to the searchElement.\
		fireEvent.click(
			searchElement,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		fireEvent.change(searchElement, {
			target: { value: 'testing' },
		});

		expect(searchElement.value).toEqual('testing');
	});

	test('should check if the component is focused if the user clicks the Enter key', () => {
		// Simulating the user event to the searchElement.\
		fireEvent.keyDown(searchElement, {
			key: 'Enter',
			code: 'Enter',
		});

		expect(document.activeElement === searchElement).toBe(true);
	});
});
