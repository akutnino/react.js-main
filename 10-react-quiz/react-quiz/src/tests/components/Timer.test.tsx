import { cleanup } from '@testing-library/react';
import { afterEach, describe, test } from 'vitest';

describe('Timer component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test.todo('should render the component correctly', () => {});

	test.todo('should check if the component updates the time correctly', () => {});

	test.todo('should render the FinishScreen if the time is 0', () => {});

	test.todo('should render correctly if the minutes is less that 10', () => {});

	test.todo('should render correctly if the seconds is less that 10', () => {});
});
