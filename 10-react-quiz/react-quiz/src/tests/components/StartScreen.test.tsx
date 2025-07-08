import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, test } from 'vitest';
import StartScreen from '../../components/StartScreen.tsx';

describe('StartScreen component test suite', () => {
	beforeEach(() => {
		const {} = render(<StartScreen />);
	});

	afterEach(() => {
		cleanup();
	});

	test.todo('should render the component correctly', () => {});

	test.todo('should total questions value correctly', () => {});

	test.todo('should start the quiz if the Start button is clicked', () => {});
});
