import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import Logo from '../../components/Logo.tsx';

describe('App component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { getByTestId } = render(<Logo />);

		expect(getByTestId('logo').innerHTML).toEqual('🌴 Far Away 👜');
	});
});
