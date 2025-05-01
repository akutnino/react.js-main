import { cleanup, fireEvent, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { useState } from 'react';
import Search from '../../components/Search.tsx';

type RenderRerenderType = (ui: React.ReactNode) => void;

type RenderHookResultType = {
	current: {
		query: string;
		setQuery: React.Dispatch<React.SetStateAction<string>>;
	};
};

describe('Search component test suite', () => {
	let searchElement: HTMLInputElement;
	let renderRerender: RenderRerenderType;
	let renderHookResult: RenderHookResultType;

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

		renderHookResult = result as RenderHookResultType;
		renderRerender = rerender as RenderRerenderType;
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

		renderRerender(
			<Search
				query={renderHookResult.current.query}
				setQuery={renderHookResult.current.setQuery}
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
