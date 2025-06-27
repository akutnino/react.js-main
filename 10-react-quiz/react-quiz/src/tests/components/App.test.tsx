import { cleanup } from '@testing-library/react';
import { afterEach, describe, test } from 'vitest';

describe('App component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test.todo('should show all components in the DOM', () => {});

	test.todo('should render the Loader component if the status is loading', () => {});
	test.todo('should render the StartScreen component if the status is ready', () => {});
	test.todo(
		'should render the Progress, Question, and Footer components if the status is active',
		() => {}
	);
	test.todo(
		'should render the FinishScreen component if the status is finished',
		() => {}
	);
	test.todo('should render the ErrorMessage component if the status is error', () => {});
});
