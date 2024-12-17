import { defineConfig } from 'vitest/config';

const rootDir = '<rootDir>/src';
const testDir = '<rootDir>/src/test';

export default defineConfig({
	test: {
		coverage: {
			enabled: true,
			all: true,
			include: [`${rootDir}/**/*.tsx`, `${rootDir}/**/*.ts`],
		},
		watch: false,
		globals: true,
		environment: 'jsdom',
		dir: `${testDir}/**/*.ts`,
	},
});
