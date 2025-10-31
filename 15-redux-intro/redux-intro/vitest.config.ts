import { configDefaults, defineConfig, ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
	test: {
		coverage: {
			enabled: true,
			clean: true,
			provider: 'v8',
			reporter: ['text', 'html', 'clover', 'json'],
			include: ['**/src/**', '**\\/*{.,-}{test,spec}?(-d).?(c|m)[jt]s?(x)'],
			exclude: [...configDefaults.exclude, './src/components/Main.tsx', './src/versions'],
			reportOnFailure: true,
		},
		globals: true,
		watch: false,
		dir: './src/tests',
		environment: 'jsdom',
		reporters: ['verbose'],
		setupFiles: [
			'@testing-library/jest-dom',
			'@testing-library/react',
			'@testing-library/user-event',
		],
	},
});

export default config;
