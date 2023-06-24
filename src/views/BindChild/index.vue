<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { showConfirmDialog, showNotify } from 'vant'

const userStore = useUserStore()

// 获取搜索结果中用户的班级名称
const getClassName = (unitsName: string) => {
	const data = unitsName.split('|')
	return data[data.length - 1]
}

// 判断该用户是否已被绑定
const isBind = (userId: number) => {
	return userStore.BoundUserInfo.find((item: any) => item.userId === userId)
}

// 绑定按钮回调事件
const handleBindClick = (userId: number) => {
	showConfirmDialog({
		title: '提示',
		message: '是否绑定该用户？'
	})
		.then(async () => {
			await userStore.bindBeViewerAction(userId)
			showNotify({ type: 'success', message: '绑定成功' })
			await userStore.getBoundUserAction()
		})
		.catch(() => {})
}

const keyword = ref('')
const onSearch = (val: any) => {
	userStore.searchUserByKeywordAction(val)
}
const onCancel = () => {
	userStore.searchResultUserList = []
}
</script>

<template>
	<!-- 搜索栏 -->
	<form action="/">
		<van-search
			v-model="keyword"
			show-action
			placeholder="请输入孩子的学号或姓名"
			@search="onSearch"
			@cancel="onCancel"
		/>
	</form>
	<!-- 搜索结果 -->
	<div class="search-result">
		<van-empty
			description="暂无相关信息"
			image-size="75"
			v-if="userStore.searchResultUserList.length === 0"
		/>
		<template v-else
			><div
				v-for="user in userStore.searchResultUserList"
				:key="user.userId"
				class="userInfo"
			>
				<div class="left">
					<span>姓名：{{ user.name }}</span>
					<span>学号：{{ user.schNo }}</span>
					<span>班级：{{ getClassName(user.unitsName) }}</span>
				</div>
				<div class="right">
					<van-button
						@click="handleBindClick(user.userId)"
						:disabled="isBind(user.userId) ? true : false"
						>{{ isBind(user.userId) ? '已绑定' : '绑定' }}</van-button
					>
				</div>
			</div>
		</template>
	</div>
</template>

<style scoped>
.search-result .userInfo {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px;
	padding: 15px;
	border-radius: 10px;
	border-bottom: 1px solid #ddd;
	background-color: rgb(39, 174, 96);
	color: white;
}

.search-result .userInfo .left {
	display: flex;
	flex-direction: column;
}
</style>
