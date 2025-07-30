import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import App from '../../components/App.tsx';

describe('Main component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component without crashing', () => {
		const SECRET_URL: string = 'http://localhost:8000/questions';
		const { container, getByTestId } = render(<App secretURL={SECRET_URL} />);

		expect(getByTestId('container')).toBeInTheDocument();
		expect(container).toContainElement(getByTestId('container'));
	});
});
