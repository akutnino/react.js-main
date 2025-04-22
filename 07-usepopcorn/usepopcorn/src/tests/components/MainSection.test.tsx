import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import MainSection from '../../components/MainSection.tsx';

describe('MainSection component test suite', () => {
	let mainSectionElement: HTMLElement;
	let childrenElement: HTMLDivElement;

	beforeEach(() => {
		const { getByTestId } = render(
			<MainSection>
				<div data-testid='children'>children</div>
			</MainSection>
		);

		mainSectionElement = getByTestId('mainSection') as HTMLElement;
		childrenElement = getByTestId('children') as HTMLDivElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(mainSectionElement).toBeInTheDocument();
		expect(childrenElement).toBeInTheDocument();
	});

	test('should check that the children is mounted by default', () => {
		expect(mainSectionElement.firstElementChild).toBe(childrenElement);
		expect(childrenElement.parentElement).toBe(mainSectionElement);
	});
});
