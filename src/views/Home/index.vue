<script setup lang="ts">
import { onMounted } from 'vue'
import { LoginApi, loginCallBack } from '@/api/modules/login'
import { useViewerStore } from '@/stores/modules/viewer'

const viewerStore = useViewerStore()

const hand = async () => {
	console.log('点击了按钮')
	const data = await LoginApi()
	console.log(data)
	location.href = data as any
}
const hand2 = async () => {
	console.log('点击了按钮2')
	// 获取url里面的code参数
	const url = location.href
	const code = url.split('?')[1]?.split('=')[1]
	console.log(code)
	const data = await loginCallBack({ code })
	console.log(data)
}
onMounted(async () => {
	const url = location.href
	const code = url.split('?')[1]?.split('=')[1]
	if (code && !viewerStore.openId) {
		const { result } = await viewerStore.loginCallBackAction({ code })
		viewerStore.openId = result.openId
	} else if (!viewerStore.openId) {
		const data = await LoginApi()
		location.href = data as any
	}
	console.log('pinia中存储的openId', viewerStore.openId)
})
</script>

<template>
	<van-button type="primary" @click="hand">按钮</van-button>
	<van-button type="primary" @click="hand2">按钮2</van-button>
</template>

<style scoped></style>
