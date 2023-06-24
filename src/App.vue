<template>
	<van-overlay :show="lodingStore.showLoading" :z-index="999">
		<div class="wrapper" @click.stop>
			<div class="block">
				<van-loading color="#1989fa" />
				<span>加载中...</span>
			</div>
		</div>
	</van-overlay>
	<RouterView />
	<van-tabbar route placeholder safe-area-inset-bottom>
		<van-tabbar-item to="/" icon="smile-o">进出记录</van-tabbar-item>
		<van-tabbar-item to="/children" icon="user-circle-o">
			我的孩子
		</van-tabbar-item>
	</van-tabbar>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/modules/loading'

const lodingStore = useLoadingStore()
</script>

<style>
.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.block {
	display: flex !important;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 120px;
	height: 120px;
	background-color: #fff;
	border-radius: 5px;
	font-size: 15px;
}

.block span {
	margin-top: 15px;
}
</style>
