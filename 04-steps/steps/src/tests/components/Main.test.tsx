import { cleanup } from '@testing-library/react';
import { afterEach, describe, test } from 'vitest';

describe('Main component test suite', () => {
	afterEach(() => {
		cleanup();
	});

	test('should render the component without crashing', () => {});
});
