import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import Tabbed from '../../components/Tabbed.tsx';
import { ContentType } from '../../types/components/types.ts';

describe('Tabbed component test suite', () => {
	let tabbedElement: HTMLDivElement;
	const dummyContent: ContentType = [
		{
			summary: 'React is a library for building UIs',
			details:
				'Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		},
	];

	beforeEach(() => {
		const { getByTestId } = render(<Tabbed content={dummyContent} />);

		tabbedElement = getByTestId('tabbed') as HTMLDivElement;
	});

	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		expect(tabbedElement).toBeInTheDocument();
	});
});
