import { configDefaults, defineConfig, type ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
	test: {
		coverage: {
			enabled: true,
			all: true,
			provider: 'v8',
			reporter: ['text', 'html', 'clover', 'json'],
			include: ['**/src/***', '**\\/*.{test,spec}.?(c|m)[jt]s?(x)'],
			exclude: [...configDefaults.include, './src/components/Main.tsx'],
			reportOnFailure: true,
		},
		clearMocks: true,
		globals: true,
		watch: false,
		environment: 'jsdom',
		dir: './src/tests',
		reporters: ['verbose'],
		setupFiles: [
			'@testing-library/jest-dom',
			'@testing-library/react',
			'@testing-library/user-event',
		],
	},
});

export default config;
