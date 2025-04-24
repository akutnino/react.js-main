import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { useState } from 'react';
import Search from '../../components/Search.tsx';

describe('Search component test suite', () => {
	let searchElement: HTMLInputElement;
	let sutRerender: (ui: React.ReactNode) => void;
	let sutResult: {
		current: {
			query: string;
			setQuery: React.Dispatch<React.SetStateAction<string>>;
		};
	};

	beforeEach(() => {
		const { result } = renderHook(() => {
			const [query, setQuery] = useState<string>('');
			return { query, setQuery };
		});

		const { getByTestId, rerender } = render(
			<Search
				query={result.current.query}
				setQuery={result.current.setQuery}
			/>
		);

		sutResult = result;
		sutRerender = rerender;
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

		sutRerender(
			<Search
				query={sutResult.current.query}
				setQuery={sutResult.current.setQuery}
			/>
		);

		expect(searchElement.value).toEqual('testing');
	});

	test('should check if the component is focused if the user clicks the Enter key', () => {
		// Simulating the user event to the searchElement.\
		fireEvent.keyDown(searchElement, {
			key: 'Enter',
			code: 'Enter',
		});

		expect(document.activeElement === searchElement).toBe(true);
		expect(searchElement.value).toEqual('');
	});
});
