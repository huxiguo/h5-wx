<script setup lang="ts">
import { useHomeStore } from '@/stores/modules/home'
const router = useRouter()
const homeStore = useHomeStore()
const { userInfo, unit } = storeToRefs(homeStore)
onMounted(async () => {
	// 获取路由参数里面的schNo,stuTime
	const { schNo, stuTime } = router.currentRoute.value.query
	await homeStore.getUserInfo(schNo, stuTime)
})
</script>

<template>
	<div class="flex justify-between m2 p2 text-1.5 text-dark bg-#ddd b-rd">
		<van-space direction="vertical" fill>
			<span>姓名:{{ userInfo.name }}</span>
			<span>班级:{{ unit }}</span>
			<span>学号:{{ userInfo.user.schNo }}</span>
			<span>时间:{{ userInfo.stuTime }}</span>
			<span>
				状态:
				<van-tag
					v-if="userInfo.type === '1'"
					color="#b3e19d"
					text-color="#b3e19d"
					plain
				>
					进
				</van-tag>
				<van-tag v-else color="#f56c6c" text-color="#f56c6c" plain>出</van-tag>
			</span>
		</van-space>
		<div>
			<van-image
				class="flex"
				width="4rem"
				height="3rem"
				:src="userInfo.pictureUrl"
			/>
		</div>
	</div>
</template>

<style scoped></style>
