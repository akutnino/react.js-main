import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import Loader from '../../components/Loader.tsx';

describe('Loader component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component correctly', () => {
		const { getByTestId } = render(<Loader />);
		const loaderElement = getByTestId('loader') as HTMLParagraphElement;

		expect(loaderElement).toBeInTheDocument();
		expect(loaderElement.textContent).toBe('Loading...');
	});
});
