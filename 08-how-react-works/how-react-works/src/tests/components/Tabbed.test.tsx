import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { type ContentType } from '../../types/components/types.ts';
import Tabbed from '../../components/Tabbed.tsx';

describe('Tabbed component test suite', () => {
	let tabbedElement: HTMLDivElement;
	let tabElements: HTMLElement[];
	let tabContentElement: HTMLDivElement;

	const dummyContent: ContentType = [
		{
			summary: 'React is a library for building UIs',
			details:
				'Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		},
		{
			summary: 'State management is like giving state a home',
			details:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		},
		{
			summary: 'We can think of props as the component API',
			details:
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		},
	];

	beforeEach(() => {
		const currentTestName = expect.getState().currentTestName as string;
		const exemptedTestNames: string[] = [
			'Tabbed component test suite > should render the DifferentContent component if the user clicks the last tab',
		];

		if (exemptedTestNames.includes(currentTestName)) return;

		const { getByTestId, queryAllByTestId } = render(<Tabbed content={dummyContent} />);

		tabbedElement = getByTestId('tabbed') as HTMLDivElement;
		tabElements = queryAllByTestId('tab') as HTMLElement[];
		tabContentElement = getByTestId('tab-content') as HTMLDivElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(tabbedElement).toBeInTheDocument();
		expect(tabElements).toHaveLength(4);
		expect(tabContentElement).toBeInTheDocument();
	});

	test('should render the correct TabContent if the user clicks a Tab', () => {
		const tabButtonElement: HTMLElement = tabElements[0];
		const tabContentHeaderElement: Element | null = tabContentElement.firstElementChild;
		const tabContentPElement: Element | null = tabContentElement.children[1];

		fireEvent.click(
			tabButtonElement,
			new MouseEvent('click', {
				cancelable: true,
				bubbles: true,
			})
		);

		expect(tabContentHeaderElement?.innerHTML).toBe(
			'React is a library for building UIs'
		);
		expect(tabContentPElement?.innerHTML).toBe(
			'Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		);
	});

	test('should render the DifferentContent component if the user clicks the last tab', () => {
		const { getByTestId, queryAllByTestId } = render(<Tabbed content={dummyContent} />);

		const tabElements = queryAllByTestId('tab') as HTMLElement[];
		const tabButtonElement: HTMLElement = tabElements[3];

		fireEvent.click(
			tabButtonElement,
			new MouseEvent('click', {
				cancelable: true,
				bubbles: true,
			})
		);

		const differentContentElement = getByTestId('different-content') as HTMLDivElement;

		expect(differentContentElement).toBeInTheDocument();
		expect(differentContentElement.firstElementChild?.innerHTML).toBe(
			`I'm a DIFFERENT tab, so I reset state 💣💥`
		);
	});
});
