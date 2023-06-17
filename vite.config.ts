import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import postCssPxToRem from 'postcss-pxtorem'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		UnoCSS(),
		Components({
			resolvers: [VantResolver()]
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
