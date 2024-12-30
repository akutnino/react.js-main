import { configDefaults, defineConfig, ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
	test: {
		coverage: {
			enabled: true,
			all: true,
			include: ['**/src/**', '**/*.{test,spec}.?(c|m)[jt]s?(x)'],
			exclude: [...configDefaults.include, '/src/components/Main.tsx'],
			provider: 'v8',
			reporter: ['text', 'html', 'clover', 'json'],
			reportOnFailure: true,
		},
		watch: false,
		globals: true,
		environment: 'jsdom',
		dir: '/src/tests',
		reporters: ['verbose'],
		setupFiles: [
			'vitest',
			'@testing-library/jest-dom',
			'@testing-library/react',
			'@testing-library/user-event',
		],
	},
});

export default config;
