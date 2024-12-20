import { describe, test, expect } from 'vitest';

describe.only('Header test suite', () => {
	test('should', () => {
		const systemUnderTest = 1;
		const actualResult = 1;
		expect(actualResult).toBe(systemUnderTest);
	});
});
