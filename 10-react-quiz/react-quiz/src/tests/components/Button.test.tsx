import { cleanup } from '@testing-library/react';
import { afterEach, describe, test } from 'vitest';

describe('Button component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test.todo('should render the component correctly', () => {});

	test.todo('should check if the children is mounted by defualt', () => {});

	test.todo(
		'should check if the callback is called when the button was clicked',
		() => {}
	);
});
