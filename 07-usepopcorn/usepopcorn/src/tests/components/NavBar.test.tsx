import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import NavBar from '../../components/NavBar.tsx';

describe('NavBar component test suite', () => {
	let navBarElement: HTMLElement;
	let logoElement: HTMLDivElement;
	let childrenElement: HTMLDivElement;

	beforeEach(() => {
		const { getByTestId } = render(
			<NavBar>
				<div data-testid='children'>children</div>
			</NavBar>
		);

		navBarElement = getByTestId('navbar') as HTMLElement;
		logoElement = getByTestId('logo') as HTMLDivElement;
		childrenElement = getByTestId('children') as HTMLDivElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(navBarElement).toBeInTheDocument();
		expect(logoElement).toBeInTheDocument();
	});

	test('should render the components in order', () => {
		expect(navBarElement.firstElementChild).toBe(logoElement);
		expect(navBarElement.children[1]).toBe(childrenElement);
	});
});
