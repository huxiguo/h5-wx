import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import postCssPxToRem from 'postcss-pxtorem'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		UnoCSS(),
		Components({
			resolvers: [VantResolver()]
		}),
		AutoImport({
			imports: [
				// 插件预设支持导入的api
				'vue',
				'vue-router',
				'pinia'
			],
			eslintrc: {
				enabled: false, // Default `false`
				filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
				globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			},
			dts: './auto-imports.d.ts'
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	css: {
		postcss: {
			plugins: [
				postCssPxToRem({
					rootValue: 37.5,
					propList: ['*']
				})
			]
		}
	}
})
