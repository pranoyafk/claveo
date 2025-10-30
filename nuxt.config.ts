// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxt/ui',
		'@nuxt/eslint',
		'nuxt-auth-utils',
	],
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	compatibilityDate: '2025-07-15',
	eslint: {
		config: {
			stylistic: {
				semi: true,
				indent: 'tab',
				quotes: 'single',
			},
		},
	},
});
