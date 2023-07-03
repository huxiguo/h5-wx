<script setup lang="ts">
import { useViewerStore } from '@/stores/modules/viewer'
import { useUserStore } from '@/stores/modules/user'
import { showConfirmDialog, showNotify } from 'vant'
import { LoginApi } from '@/api/modules/login'
import { showDialog } from 'vant'

const viewerStore = useViewerStore()
const userStore = useUserStore()
const router = useRouter()

function getCodeFromURL(url: string) {
	const regex = /[?&]code=([^&#]*)/
	const match = regex.exec(url)
	if (match && match[1]) {
		return match[1]
	} else {
		return null
	}
}

onMounted(async () => {
	const url = location.href
	const code = getCodeFromURL(url)
	if (code && !viewerStore.openId) {
		const { result } = await viewerStore.loginCallBackAction({ code })
		viewerStore.openId = result.openId
		viewerStore.getViewerInfoAction()
		userStore.getBoundUserAction()
	} else if (!viewerStore.openId) {
		showDialog({
			title: '提示',
			message: '您暂未授权该网页读取您的信息，请先进行授权操作'
		}).then(async () => {
			const data = await LoginApi()
			location.href = data as any
		})
	}
})

// 解绑按钮点击回调
const handleUnbindClick = (id: number) => {
	showConfirmDialog({
		title: '提示',
		message: '是否继续解绑操作？'
	})
		.then(async () => {
			await userStore.unbindBeViewerAction(id)
			showNotify({ type: 'success', message: '解绑成功' })
			await userStore.getBoundUserAction()
		})
		.catch(() => {})
}

// 绑定孩子按钮回调
const handleBindChildClick = () => {
	// 跳转到绑定孩子页面
	router.push('/bindChild')
}

// 获取孩子的班级名称
const getClassName = (unitsName: string) => {
	const data = unitsName.split('|')
	return data[data.length - 1]
}
</script>

<template>
	<!-- 监视人信息 -->
	<div class="viewerInfo">
		<img :src="viewerStore.viewerInfo?.avatar" class="avatar" />
		<div class="text">
			<span>监视人ID:{{ viewerStore.viewerInfo?.viewId }}</span>
			<span>家长姓名:{{ viewerStore.viewerInfo?.nickname }}</span>
			<span>当前绑定孩子数量：{{ userStore.BoundUserInfo.length }}</span>
		</div>
	</div>
	<!-- 被监视人信息 -->
	<div class="my-children">
		<div class="header">
			<span>已绑定的孩子</span>
			<van-button type="primary" size="small" @click="handleBindChildClick"
				>绑定孩子</van-button
			>
		</div>
		<van-empty
			description="暂无已绑定的孩子"
			image-size="75"
			v-if="userStore.BoundUserInfo.length === 0"
		/>
		<template v-else>
			<div
				class="child"
				v-for="user in userStore.BoundUserInfo"
				:key="user.userId"
			>
				<div class="left">
					<span>姓名：{{ user.name }}</span>
					<span>学号：{{ user.schNo }}</span>
					<span>班级：{{ getClassName(user.unitsName) }}</span>
				</div>
				<div class="right">
					<van-button @click="handleUnbindClick(user.userId)">解绑</van-button>
				</div>
			</div>
		</template>
	</div>
</template>

<style>
.viewerInfo {
	display: flex;
	margin: 10px;
	padding: 15px;
	border-radius: 10px;
	border-bottom: 1px solid #ddd;
	background-color: #27ae60;
	color: white;
}

.viewerInfo .avatar {
	width: 50px;
	height: 50px;
	margin-right: 15px;
}

.viewerInfo .text {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.my-children {
	padding: 10px;
	border-top: 1px solid #ddd;
}

.my-children .header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.my-children .child {
	display: flex;
	margin-top: 15px;
	padding: 15px;
	border-radius: 10px;
	background-color: #ddd;
}

.my-children .child .left {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.my-children .child .right {
	display: flex;
	align-items: center;
}
</style>
