import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, test } from 'vitest';
import Tabbed from '../../components/Tabbed.tsx';

describe('Tabbed component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { getByTestId } = render(<Tabbed />);
	});
});
