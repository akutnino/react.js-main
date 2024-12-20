import { defineConfig, ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
	test: {
		coverage: {
			enabled: true,
			all: true,
			include: ['**/src/**', '**/*.{test,spec}.?(c|m)[jt]s?(x)'],
			provider: 'v8',
			reporter: ['text', 'html', 'clover', 'json'],
			reportOnFailure: true,
		},
		watch: false,
		globals: true,
		environment: 'node',
		dir: './src/tests/',
		reporters: ['verbose'],
	},
});

export default config;
