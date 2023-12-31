<script setup lang="ts">
import { useRecordStore } from '@/stores/modules/record'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Record } from '@/global/record'

const recordStore = useRecordStore()
const router = useRouter()

// 日期选择器的显示
const showPicker = ref(false)
// 是否在触发上拉刷新
const loading = ref(false)
// 日期选择器最小日期
const minDate = new Date(2023, 0, 1)
// 日期选择器最大日起
const maxDate = new Date(new Date().getFullYear(), 11, 31)

// 发送请求的params参数
const searchForm = ref({
	startTime: new Date(new Date().getTime() - 24 * 7 * 60 * 60 * 1000)
})

onMounted(() => {
	getNowFormatDate()
	recordStore.getAllRecordAction(searchForm.value)
})

// 日期选择器确认按钮回调
const onConfirm = ({ selectedValues }: any) => {
	recordStore.initializeData()
	recordStore.selectDate = selectedValues.join('/')
	showPicker.value = false
	searchForm.value.startTime = new Date(
		new Date(recordStore.selectDate).getTime()
	)
	recordStore.getAllRecordAction(searchForm.value)
}

// 获取七天前的日期
const getNowFormatDate = () => {
	const dataStr = new Date(new Date().getTime() - 24 * 7 * 60 * 60 * 1000)
	let year = dataStr.getFullYear()
	let month: string | number = dataStr.getMonth() + 1
	let strDate: string | number = dataStr.getDate()
	if (month < 10) month = `0${month}`
	if (strDate < 10) strDate = `0${strDate}`
	recordStore.selectDate = `${year}/${month}/${strDate}`
}

// 格式化时间
const formattedDate = (str: any) => {
	const date = new Date(str)
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')
	const hour = date.getHours().toString().padStart(2, '0')
	const minute = date.getMinutes().toString().padStart(2, '0')
	const second = date.getSeconds().toString().padStart(2, '0')
	const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`
	return formattedDate
}

// 获取班级名称
const getClassName = (unitsName: string) => {
	const data = unitsName.split('|')
	return data[data.length - 1]
}

// 点击记录的回调
const handleRecordClick = (item: Record.recordList) => {
	const { stuTime, schNo } = item
	router.push({
		path: '/info',
		query: {
			stuTime,
			schNo
		}
	})
}

// 上拉加载更多记录
const getMoreRecord = () => {
	recordStore.currentPage++
	recordStore.getAllRecordAction(searchForm.value)
}

// 上拉刷新回调
const onRefresh = () => {
	recordStore.initializeData()
	recordStore.getAllRecordAction(searchForm.value)
	loading.value = false
}
</script>

<template>
	<van-pull-refresh v-model="loading" @refresh="onRefresh">
		<!-- 回到顶部 -->
		<van-back-top right="1vw" bottom="10vh" />
		<!-- 总数 -->
		<div class="text-center mt1.5 text-1.5 total">
			共{{ recordStore.total }}条记录
		</div>
		<!-- 日期选择 -->
		<van-field
			v-model="recordStore.selectDate"
			is-link
			readonly
			name="datePicker"
			label="起始时间"
			placeholder="点击选择时间"
			@click="showPicker = true"
		/>
		<van-popup v-model:show="showPicker" position="bottom">
			<van-date-picker
				@confirm="onConfirm"
				@cancel="showPicker = false"
				:min-date="minDate"
				:max-date="maxDate"
			/>
		</van-popup>
		<!-- 进出记录数据展示 -->
		<div class="recordList">
			<van-empty
				description="暂无进出记录"
				image-size="75"
				v-if="recordStore.recordList.length === 0"
			/>
			<template v-else>
				<van-list @load="getMoreRecord">
					<div
						class="flex justify-between m2 p2 text-1.5 text-dark bg-#ddd b-rd"
						v-for="item in recordStore.recordList"
						:key="item.recordId"
						@click="handleRecordClick(item)"
					>
						<van-space direction="vertical" fill>
							<span>姓名：{{ item.cardName }}</span>
							<span>班级：{{ getClassName(item.user.unitsName) }}</span>
							<span>刷脸时间：{{ formattedDate(item.stuTime) }}</span>
						</van-space>
					</div>
				</van-list>
			</template>
		</div></van-pull-refresh
	>
</template>

<style scoped>
.total {
	line-height: 40px;
	background-color: #27ae60;
	color: white;
}
</style>
