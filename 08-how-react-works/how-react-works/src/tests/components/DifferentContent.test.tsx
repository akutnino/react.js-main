import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import DifferentContent from '../../components/DifferentContent.tsx';

describe('DifferentContent component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { getByTestId } = render(<DifferentContent />);

		expect(getByTestId('different-content')).toBeInTheDocument();
		expect(getByTestId('different-content').firstElementChild?.innerHTML).toBe(
			`I'm a DIFFERENT tab, so I reset state 💣💥`
		);
	});
});
