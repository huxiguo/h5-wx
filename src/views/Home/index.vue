<script setup lang="ts">
import { LoginApi, test } from '@/api/modules/login'
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
	const code = url.split('?')[1].split('=')[1]
	console.log(code)
	const data = await test({ code })
	console.log(data)
}
</script>

<template>
	<van-button type="primary" @click="hand">按钮</van-button>
	<van-button type="primary" @click="hand2">按钮2</van-button>
</template>

<style scoped></style>
