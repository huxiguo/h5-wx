<script setup lang="ts">
import axios from 'axios'
const router = useRouter()
const name = ref()
const unitsName = ref()
const stuNo = ref()
const time = ref()
const status = ref()
const url = ref()
const BASE_URL = import.meta.env.VITE_API_URL
onMounted(async () => {
	// 获取路由参数里面的schNo,stuTime
	const { schNo, stuTime } = router.currentRoute.value.query
	// 配置axios
	axios.defaults.baseURL = BASE_URL
	const { data: res } = await axios.get(`/getRecordByOne/${schNo}/${stuTime}`)
	name.value = res.user.name
	const data = res.user.unitsName.split('|')
	unitsName.value = data[data.length - 1]
	stuNo.value = res.user.schNo
	time.value = res.stuTime
	status.value = res.type
})
</script>

<template>
	<div class="flex justify-between m2 p2 text-1.5 text-dark bg-#ddd b-rd">
		<van-space direction="vertical" fill>
			<span>姓名:{{ name }}</span>
			<span>班级:{{ unitsName }}</span>
			<span>学号:{{ stuNo }}</span>
			<span>时间:{{ time }}</span>
			<span>
				状态:
				<van-tag v-if="status" color="#b3e19d" text-color="#b3e19d" plain>
					进
				</van-tag>
				<van-tag v-else color="#f56c6c" text-color="#f56c6c" plain>出</van-tag>
			</span>
		</van-space>
		<div>
			<van-image class="flex" width="4rem" height="3rem" :src="url" />
		</div>
	</div>
</template>

<style scoped></style>
