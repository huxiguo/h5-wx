import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/stores'

import '@/assets/css/global.css'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'

import 'normalize.css'
import 'lib-flexible'

import 'virtual:uno.css'

// 判断是否在微信浏览器中打开
const ua = navigator.userAgent.toLowerCase()
if (ua.indexOf('micromessenger') === -1) {
	window.location.href =
		'https://open.weixin.qq.com/connect/oauth2/authorize?appid=888'
}

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
